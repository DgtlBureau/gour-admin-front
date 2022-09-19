import React from 'react';

import { CategoryCreateDto } from '../../../@types/dto/category/create.dto';
import { NewCategory } from '../../../@types/entities/Category';
import { Modal } from '../../UI/Modal/Modal';
import { Button } from '../../UI/Button/Button';
import { CreateCategoryForm } from '../CreateForm/CreateForm';

export type CreateModalProps = {
  isOpen: boolean;
  currentCategory?: NewCategory;
  categories: NewCategory[];
  onSave: (category: CategoryCreateDto) => void;
  onClose: () => void;
};

type ModalActionsProps = {
  onCancel: () => void;
};

function ModalActions({ onCancel }: ModalActionsProps) {
  return (
    <>
      <Button
        form="createCategoryForm"
        type="submit"
        size="small"
        sx={{ marginRight: '10px' }}
      >
        Сохранить
      </Button>
      <Button variant="outlined" size="small" onClick={onCancel}>
        Отменить
      </Button>
    </>
  );
}

export function CreateCategoryModal({
  isOpen,
  currentCategory,
  categories,
  onSave,
  onClose,
}: CreateModalProps) {
  const modalTitle = currentCategory
    ? 'Редактирование категории товара'
    : 'Добавление категории товара';

  const formattedCategories = categories.map(category => ({
    label: category.title.ru,
    value: category.id,
  }));

  const defaultValues: CategoryCreateDto = {
    title: currentCategory?.title || { ru: '', en: '' },
    parentCategoriesIds: (currentCategory?.parentCategories as number[] | null) || [],
  };

  return (
    <Modal
      isOpen={isOpen}
      title={modalTitle}
      actions={<ModalActions onCancel={onClose} />}
      onClose={onClose}
    >
      <CreateCategoryForm
        categories={formattedCategories}
        onSave={onSave}
        defaultValues={defaultValues}
      />
    </Modal>
  );
}
