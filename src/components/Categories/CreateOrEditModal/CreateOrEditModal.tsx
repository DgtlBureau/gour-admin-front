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
  onUpdate: (category: CreateFormType) => void;
  onCreate: (category: CreateFormType) => void;
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
  onUpdate,
  onCreate,
  onClose,
}: CreateModalProps) {
  const modalTitle = currentCategory
    ? 'Редактирование категории товара'
    : 'Добавление категории товара';

  const defaultValues: CreateFormType = {
    title: currentCategory?.title.ru || '',
    subCategories: getSubCategoriesObject(currentCategory?.subCategories || []) || {},
  };

  const handleSave = (data: CreateFormType) => {
    if (currentCategory) {
      onUpdate(data);
    } else {
      onCreate(data);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={modalTitle}
      actions={<ModalActions onCancel={onClose} />}
      onClose={onClose}
    >
      <CreateOrEditCategoryForm onSave={handleSave} defaultValues={defaultValues} />
    </Modal>
  );
}
