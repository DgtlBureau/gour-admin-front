import React from 'react';

import { TranslatableStringDto } from '../../../@types/dto/translatable-string.dto';
import { CategoryCreateDto } from '../../../@types/dto/category/create.dto';
import { NewCategory } from '../../../@types/entities/Category';
import { Modal } from '../../UI/Modal/Modal';
import { Button } from '../../UI/Button/Button';
import { CategoryForm, CreateCategoryForm } from '../CreateForm/CreateForm';

export type CreateModalProps = {
  isOpen: boolean;
  category?: NewCategory;
  categories: {
    label: string;
    value: number;
  }[];
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
  category,
  categories,
  onSave,
  onClose,
}: CreateModalProps) {
  const modalTitle = category
    ? 'Редактирование категории товара'
    : 'Добавление категории товара';

  const defaultValues: CategoryCreateDto = {
    title: category?.title || { ru: '', en: '' },
    parentCategoriesIds: (category?.parentCategories as number[] | null) || [],
  };

  return (
    <Modal
      isOpen={isOpen}
      title={modalTitle}
      actions={<ModalActions onCancel={onClose} />}
      onClose={onClose}
    >
      <CreateCategoryForm
        categories={categories}
        onSave={onSave}
        defaultValues={defaultValues}
      />
    </Modal>
  );
}
