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
import { eventBus, EventTypes } from '../../packages/EventBus';
import { NotificationType } from '../../@types/entities/Notification';

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

  const { data: categories = [] } = useGetAllCategoriesQuery();

  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);

  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const editingCategory = categories?.find(it => it.id === selectedCategoryId); // FIXME: переписать функцию

  const openCreating = () => setIsCreating(true);
  const closeCreating = () => setIsCreating(false);

  const openEditing = (id: number) => {
    setSelectedCategoryId(id);
    setIsEditing(true);
  };
  const closeEditing = () => {
    setSelectedCategoryId(-1);
    setIsEditing(false);
  };

  const openDeleting = (id: number) => {
    setSelectedCategoryId(id);
    setIsDeleting(true);
  };
  const closeDeleting = () => {
    setSelectedCategoryId(-1);
    setIsDeleting(false);
  };

  const create = (category: CategoryCreateDto) => {
    createCategory({ ...category }); // FIXME: fix
    closeCreating();
  };
  const edit = (category: CategoryCreateDto) => {
    editCategory({ id: selectedCategoryId, ...category });
    closeEditing();
  };
  const remove = async () => {
    try {
      await deleteCategory(selectedCategoryId).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Категория успешно создана',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      console.log(error);
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
        rightContent={<RightContent onClick={openCreating} />}
      />
      {categories ? (
        <CategoriesTable
          categories={categories}
          onDelete={openDeleting}
          onEdit={openEditing}
        />
      ) : (
        <Typography variant="body1">Список категорий пуст</Typography>
      )}
      <CreateCategoryModal
        isOpen={isCreating}
        categories={categories}
        onSave={create}
        onClose={closeCreating}
      />
      <CreateCategoryModal
        isOpen={isEditing}
        currentCategory={editingCategory}
        categories={categories}
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
