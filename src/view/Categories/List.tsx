import React, { useState } from 'react';

import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Typography } from '../../components/UI/Typography/Typography';
import { CreateOrEditModalCategoryModal } from '../../components/Categories/CreateOrEditModal/CreateOrEditModal';
import { DeleteCategoryModal } from '../../components/Categories/DeleteModal/DeleteModal';
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '../../api/categoryApi';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { NotificationType } from '../../@types/entities/Notification';
import { CategoryProductType } from '../../components/Categories/ProductType/ProductType';
import type { CreateFormType } from '../../components/Categories/CreateOrEditForm/types';
import { MidLevelCategory, TopLevelCategory } from '../../@types/entities/Category';
import { ProductTypeModal } from '../../components/Categories/ProductTypeModal/ProductTypeModal';
import { getEditedCategories } from '../../components/Categories/categories.helper';

type RightContentProps = {
  onClick: () => void;
};

function RightContent({ onClick }: RightContentProps) {
  return <Button onClick={onClick}>Создать тип продукта</Button>;
}

function ListCategoriesView() {
  const [createCategory] = useCreateCategoryMutation();
  const [editCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const { data: categories = [] } = useGetAllCategoriesQuery();

  // FIXME: убрать undefined
  const [openedCategory, setOpenedCategory] =
    useState<
      | { category: MidLevelCategory | undefined; parentCategory: TopLevelCategory }
      | undefined
    >(undefined);

  const [openedProductTypeId, setOpenedProductTypeId] = useState<number | null>(null);
  const [isCategoryCreating, setIsCategoryCreating] = useState<number | null>(null);
  const [deletedId, setDeletedId] = useState<number | null>();
  const [isDeleting, setIsDeleting] = useState(false);

  const openedProductType = categories.find(
    category => category.id === openedProductTypeId
  );

  const createProductType = () => {
    setOpenedProductTypeId(-1);
  };

  const editProductType = (id: number) => {
    setOpenedProductTypeId(id);
  };

  const openCreateCategory = (parentCategory: TopLevelCategory) => {
    setOpenedCategory({ category: undefined, parentCategory });
  };

  const openEditingCategory = (
    category: MidLevelCategory | undefined,
    parentCategory: TopLevelCategory
  ) => {
    setOpenedCategory({ category, parentCategory });
  };

  const openDeleting = (id: number) => {
    setDeletedId(id);
    setIsDeleting(true);
  };

  const closeDeleting = () => {
    setDeletedId(null);
    setIsDeleting(false);
  };

  const handleCreateCategory = async (data: CreateFormType) => {
    const { title, subCategories } = data;

    if (!openedCategory?.parentCategory) return;

    const subCategoriesArray = subCategories
      ? Object.keys(subCategories).map(subCategoryId => subCategories[+subCategoryId])
      : [];

    const newSubCategories = subCategoriesArray.filter(subCategory => !subCategory.id);

    try {
      const newCategory = await createCategory({
        title: {
          ru: title,
          en: '',
        },
        parentCategoriesIds: [openedCategory.parentCategory.id],
      }).unwrap();

      const newSubCategoriesPromises = newSubCategories.map(async subCategory => {
        createCategory({
          title: {
            ru: subCategory.title,
            en: '',
          },
          parentCategoriesIds: [newCategory.id],
        }).unwrap();
      });

      await Promise.all(newSubCategoriesPromises);

      setOpenedCategory(undefined);
      eventBus.emit(EventTypes.notification, {
        message: 'Категория создана!',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка создания категории',
        type: NotificationType.DANGER,
      });
    }
  };

  const handleUpdateCategory = async (data: CreateFormType) => {
    const { title, subCategories } = data;

    if (!openedCategory?.category) return;

    const categoryId = openedCategory.category.id;

    const subCategoriesArray = subCategories
      ? Object.keys(subCategories).map(subCategoryId => subCategories[+subCategoryId])
      : [];

    const newSubCategories = subCategoriesArray.filter(subCategory => !subCategory.id);
    const createdCategories = subCategoriesArray.filter(subCategory => !!subCategory.id);

    const editedSubCategories = getEditedCategories(
      createdCategories,
      openedCategory.category.subCategories
    );

    try {
      await editCategory({
        id: categoryId,
        title: {
          ru: title,
          en: '',
        },
      });
      const newSubCategoriesPromises = newSubCategories.map(async subCategory => {
        createCategory({
          title: {
            ru: subCategory.title,
            en: '',
          },
          parentCategoriesIds: [categoryId],
        }).unwrap();
      });
      const updatedCategoriesPromises = editedSubCategories.map(async subCategory => {
        if (!subCategory.id) return;
        editCategory({
          id: subCategory.id,
          title: {
            ru: subCategory.title,
            en: '',
          },
        }).unwrap();
      });
      await Promise.all([...newSubCategoriesPromises, ...updatedCategoriesPromises]);
      eventBus.emit(EventTypes.notification, {
        message: 'Категория обновлена',
        type: NotificationType.SUCCESS,
      });
      setOpenedCategory(undefined);
    } catch (error) {
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка обновления категории',
        type: NotificationType.DANGER,
      });
    }
  };

  const handleSaveProductType = async (data: { title: string }) => {
    if (!openedProductTypeId) return;
    try {
      if (openedProductTypeId === -1) {
        await createCategory({
          title: {
            ru: data.title,
            en: '',
          },
        }).unwrap();
        eventBus.emit(EventTypes.notification, {
          message: 'Тип продукта создан',
          type: NotificationType.SUCCESS,
        });
        setOpenedProductTypeId(null);
      } else {
        await editCategory({
          id: openedProductTypeId,
          title: {
            ru: data.title,
            en: '',
          },
        }).unwrap();
        eventBus.emit(EventTypes.notification, {
          message: 'Тип продукта обновлен',
          type: NotificationType.SUCCESS,
        });
      }

      setOpenedProductTypeId(null);
    } catch (error) {
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка создания типа продукта',
        type: NotificationType.DANGER,
      });
    }
  };

  const handleDelete = async () => {
    if (!deletedId) return;
    try {
      await deleteCategory(deletedId).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Категория удалена',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка',
        type: NotificationType.DANGER,
      });
    }
    setOpenedCategory(undefined);
    closeDeleting();
  };

  return (
    <div>
      <Header
        leftTitle="Категории"
        rightContent={<RightContent onClick={createProductType} />}
      />
      {categories ? (
        categories.map(productType => (
          <CategoryProductType
            key={productType.id}
            productType={productType}
            onEdit={editProductType}
            onDelete={openDeleting}
            onCreateCategory={openCreateCategory}
            onEditCategory={openEditingCategory}
            onDeleteCategory={openDeleting}
          />
        ))
      ) : (
        <Typography variant="body1">Список категорий пуст</Typography>
      )}

      <ProductTypeModal
        isOpen={!!openedProductTypeId}
        productType={openedProductType}
        onClose={() => setOpenedProductTypeId(null)}
        onSave={handleSaveProductType}
      />

      <CreateOrEditModalCategoryModal
        isOpen={!!openedCategory || !!isCategoryCreating}
        currentCategory={openedCategory?.category}
        onUpdate={handleUpdateCategory}
        onCreate={handleCreateCategory}
        onDeleteSubCategory={openDeleting}
        onClose={() => {
          setOpenedCategory(undefined);
          setIsCategoryCreating(null);
        }}
      />

      <DeleteCategoryModal
        isOpen={isDeleting}
        onRemove={handleDelete}
        onClose={closeDeleting}
      />
    </div>
  );
}

export default ListCategoriesView;
