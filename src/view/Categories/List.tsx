import React, { useState } from 'react';

import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from 'api/categoryApi';

import { CategoryHasDiscount, CreateFormType } from 'components/Categories/CreateOrEditForm/types';
import { CreateOrEditModalCategoryModal } from 'components/Categories/CreateOrEditModal/CreateOrEditModal';
import { DeleteCategoryModal } from 'components/Categories/DeleteModal/DeleteModal';
import { CategoryProductType } from 'components/Categories/ProductType/ProductType';
import { ProductTypeModal } from 'components/Categories/ProductTypeModal/ProductTypeModal';
import { getEditedCategories } from 'components/Categories/categories.helper';
import { Header } from 'components/Header/Header';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import { MidLevelCategory, TopLevelCategory } from 'types/entities/Category';
import { NotificationType } from 'types/entities/Notification';

import { dispatchNotification } from 'packages/EventBus';

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

  const [openedCategory, setOpenedCategory] = useState<{
    category?: MidLevelCategory;
    parentCategory: TopLevelCategory;
  } | null>(null);

  const [productTypeModal, setProductTypeModal] = useState<{
    mode: 'create' | 'edit';
    productType?: TopLevelCategory;
  } | null>(null);

  const [isCategoryCreating, setIsCategoryCreating] = useState<number | null>(null);
  const [deletedId, setDeletedId] = useState<number | null>(null);

  const createProductType = () => {
    setProductTypeModal({
      mode: 'create',
    });
  };

  const editProductType = (id: number) => {
    const productType = categories.find(category => category.id === id);
    setProductTypeModal({
      productType,
      mode: 'edit',
    });
  };

  const openCreateCategory = (parentCategory: TopLevelCategory) => {
    setOpenedCategory({ category: undefined, parentCategory });
  };

  const openEditingCategory = (category: MidLevelCategory | undefined, parentCategory: TopLevelCategory) => {
    setOpenedCategory({ category, parentCategory });
  };

  const handleCreateCategory = async (data: CreateFormType) => {
    const isParentCategoryExist = openedCategory?.parentCategory;
    if (!isParentCategoryExist) return;

    const { title, hasDiscount, subCategories } = data;

    const subCategoriesArray = subCategories ? Object.values(subCategories) : [];

    const newSubCategories = subCategoriesArray.filter(subCategory => !subCategory.id);

    try {
      const newCategory = await createCategory({
        title: {
          ru: title,
          en: '',
        },
        hasDiscount: hasDiscount === CategoryHasDiscount.YES,
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

      setOpenedCategory(null);
      dispatchNotification('Категория создана!');
    } catch (error) {
      dispatchNotification('Ошибка создания категории', {
        type: NotificationType.DANGER,
      });
    }
  };

  const handleUpdateCategory = async (data: CreateFormType) => {
    const { title, hasDiscount, subCategories } = data;

    if (!openedCategory?.category) return;

    const categoryId = openedCategory.category.id;

    const subCategoriesArray = subCategories ? Object.values(subCategories) : [];

    const newSubCategories = subCategoriesArray.filter(subCategory => !subCategory.id);
    const createdCategories = subCategoriesArray.filter(subCategory => !!subCategory.id);

    const editedSubCategories = getEditedCategories(createdCategories, openedCategory.category.subCategories);

    try {
      const category = editCategory({
        id: categoryId,
        title: {
          ru: title,
          en: '',
        },
        hasDiscount: hasDiscount === CategoryHasDiscount.YES,
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
      await Promise.all([category, ...newSubCategoriesPromises, ...updatedCategoriesPromises]);
      dispatchNotification('Категория обновлена');
      setOpenedCategory(null);
    } catch (error) {
      dispatchNotification('Ошибка обновления категории', {
        type: NotificationType.DANGER,
      });
    }
  };

  const handleSaveProductType = async (data: { title: string }) => {
    try {
      if (productTypeModal?.mode === 'create') {
        await createCategory({
          title: {
            ru: data.title,
            en: '',
          },
        }).unwrap();
        dispatchNotification('Тип продукта создан');
        setProductTypeModal(null);
      }

      if (productTypeModal?.mode === 'edit' && productTypeModal.productType) {
        await editCategory({
          id: productTypeModal.productType.id,
          title: {
            ru: data.title,
            en: '',
          },
        }).unwrap();
        dispatchNotification('Тип продукта обновлен');
      }

      setProductTypeModal(null);
    } catch (error) {
      dispatchNotification('Ошибка создания типа продукта', {
        type: NotificationType.DANGER,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(deletedId!).unwrap();
      dispatchNotification('Категория удалена');
    } catch (error) {
      dispatchNotification('Произошла ошибка', {
        type: NotificationType.DANGER,
      });
    }
    setOpenedCategory(null);
    setDeletedId(null);
  };

  return (
    <div>
      <Header leftTitle='Категории' rightContent={<RightContent onClick={createProductType} />} />
      {categories ? (
        categories.map(productType => (
          <CategoryProductType
            key={productType.id}
            productType={productType}
            onEdit={editProductType}
            onDelete={setDeletedId}
            onCreateCategory={openCreateCategory}
            onEditCategory={openEditingCategory}
            onDeleteCategory={setDeletedId}
          />
        ))
      ) : (
        <Typography variant='body1'>Список категорий пуст</Typography>
      )}

      <ProductTypeModal
        isOpen={!!productTypeModal}
        productType={productTypeModal?.productType}
        onClose={() => setProductTypeModal(null)}
        onSave={handleSaveProductType}
      />

      <CreateOrEditModalCategoryModal
        isOpen={!!openedCategory || !!isCategoryCreating}
        currentCategory={openedCategory?.category}
        onSubmit={openedCategory?.category ? handleUpdateCategory : handleCreateCategory}
        onDeleteSubCategory={setDeletedId}
        onClose={() => {
          setOpenedCategory(null);
          setIsCategoryCreating(null);
        }}
      />

      <DeleteCategoryModal isOpen={!!deletedId} onRemove={handleDelete} onClose={() => setDeletedId(null)} />
    </div>
  );
}

export default ListCategoriesView;
