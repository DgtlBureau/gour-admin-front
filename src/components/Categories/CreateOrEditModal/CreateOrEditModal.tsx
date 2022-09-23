import React from 'react';

import type { MidLevelCategory } from '../../../@types/entities/Category';
import type { CreateFormType } from '../CreateOrEditForm/types';

import { Modal } from '../../UI/Modal/Modal';
import { Button } from '../../UI/Button/Button';
import { CreateOrEditCategoryForm } from '../CreateOrEditForm/CreateOrEditForm';
import { getSubCategoriesObject } from '../categories.helper';

export type CreateModalProps = {
  isOpen: boolean;
  currentCategory?: MidLevelCategory;
  onSave: (category: CreateFormType) => void;
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

export function CreateOrEditModalCategoryModal({
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
    subCategories: getSubCategoriesObject(currentCategory?.subCategories || []) || {},
  };

  return (
    <Modal
      isOpen={isOpen}
      title={modalTitle}
      actions={<ModalActions onCancel={onClose} />}
      onClose={onClose}
    >
      <CreateOrEditCategoryForm onSave={onSave} defaultValues={defaultValues} />
    </Modal>
  );
}
