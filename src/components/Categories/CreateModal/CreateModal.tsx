import React from 'react';

import { CategoryCreateDto } from '../../../@types/dto/category/create.dto';
import { MidLevelCategory, NewCategory } from '../../../@types/entities/Category';
import { Modal } from '../../UI/Modal/Modal';
import { Button } from '../../UI/Button/Button';
import { CreateCategoryForm, CreateFormType } from '../CreateForm/CreateForm';

export type CreateModalProps = {
  isOpen: boolean;
  currentCategory?: MidLevelCategory;
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
  onSave,
  onClose,
}: CreateModalProps) {
  const modalTitle = currentCategory
    ? 'Редактирование категории товара'
    : 'Добавление категории товара';

  const defaultValues: CreateFormType = {
    title: currentCategory?.title.ru || '',
    subCategories: currentCategory?.subCategories || [],
  };

  const handleSave = (data: CreateFormType) => {
    // onSave()
  };

  return (
    <Modal
      isOpen={isOpen}
      title={modalTitle}
      actions={<ModalActions onCancel={onClose} />}
      onClose={onClose}
    >
      <CreateCategoryForm onSave={handleSave} defaultValues={defaultValues} />
    </Modal>
  );
}
