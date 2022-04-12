import React, { useState } from 'react';

import { CategoryCreateDto } from '../../@types/dto/category/create.dto';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/UI/Button/Button';
import { Typography } from '../../components/UI/Typography/Typography';
import { CategoriesTable } from '../../components/Categories/Table/Table';
import { CreateCategoryModal } from '../../components/Categories/CreateModal/CreateModal';
import { DeleteCategoryModal } from '../../components/Categories/DeleteModal/DeleteModal';
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '../../api/categoryApi';

type RightContentProps = {
  onClick: () => void;
};

function RightContent({ onClick }: RightContentProps) {
  return <Button onClick={onClick}>Создать категорию</Button>;
}

function ListCategoriesView() {
  const [createCategory] = useCreateCategoryMutation();
  const [editCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const { data } = useGetAllCategoriesQuery();

  const [categoryId, setCategoryId] = useState(-1);

  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const editingCategory = data?.find(it => it.id === categoryId);

  const openCreating = () => setIsCreating(true);
  const closeCreating = () => setIsCreating(false);

  const openEditing = (id: number) => {
    setCategoryId(id);
    setIsEditing(true);
  };
  const closeEditing = () => {
    setCategoryId(-1);
    setIsEditing(false);
  };

  const openDeleting = (id: number) => {
    setCategoryId(id);
    setIsDeleting(true);
  };
  const closeDeleting = () => {
    setCategoryId(-1);
    setIsDeleting(false);
  };

  const create = (category: CategoryCreateDto) => {
    createCategory(category);
    closeCreating();
  };
  const edit = (category: CategoryCreateDto) => {
    editCategory({ id: categoryId, ...category });
    closeEditing();
  };
  const remove = () => {
    deleteCategory(categoryId);
    closeDeleting();
  };

  return (
    <div>
      <Header
        leftTitle="Категории"
        rightContent={<RightContent onClick={openCreating} />}
      />
      {
        data ? (
          <CategoriesTable
            categories={data}
            onDelete={openDeleting}
            onEdit={openEditing}
          />
        ) : (
          <Typography variant="body1">
            Список категорий пуст
          </Typography>
        )
      }
      <CreateCategoryModal
        isOpen={isCreating}
        onSave={create}
        onClose={closeCreating}
      />
      <CreateCategoryModal
        isOpen={isEditing}
        category={editingCategory}
        onSave={edit}
        onClose={closeEditing}
      />
      <DeleteCategoryModal
        isOpen={isDeleting}
        onRemove={remove}
        onClose={closeDeleting}
      />
    </div>
  );
}

export default ListCategoriesView;
