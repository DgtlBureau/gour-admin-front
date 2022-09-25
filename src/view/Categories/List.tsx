import React, { useState } from 'react';

import { CategoryCreateDto } from '../../@types/dto/category/create.dto';
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
  const [openedCategoryId, setOpenedCategoryId] = useState<number | null>(null);
  const [deletedId, setDeletedId] = useState<number | null>();

  const openedProductType = categories.find(
    category => category.id === openedProductTypeId
  );

  const [isCategoryCreating, setIsCategoryCreating] = useState<number | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

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
    try {
      const newCategory = await createCategory({
        title: {
          ru: title,
          en: '',
        },
      }).unwrap();
      const newSubCategoriesIds = openedCategory.parentCategory.subCategories.map(
        category => category.id
      );
      newSubCategoriesIds.push(newCategory.id);
      console.log(newSubCategoriesIds);
      editCategory({
        id: openedCategory.parentCategory.id,
        subCategoriesIds: newSubCategoriesIds,
      });
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
    try {
      await editCategory({
        id: openedCategory.category.id,
        title: {
          ru: title,
          en: '',
        },
      });
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
