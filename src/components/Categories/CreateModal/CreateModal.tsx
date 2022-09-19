import React from 'react';

import { TranslatableStringDto } from '../../../@types/dto/translatable-string.dto';
import { CategoryCreateDto } from '../../../@types/dto/category/create.dto';
import { NewCategory } from '../../../@types/entities/Category';
import { Modal } from '../../UI/Modal/Modal';
import { Button } from '../../UI/Button/Button';
import { CreateCategoryForm } from '../CreateForm/CreateForm';

export type CreateModalProps = {
  isOpen: boolean;
  category?: NewCategory;
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
  onSave,
  onClose,
}: CreateModalProps) {
  const modalTitle = category
    ? 'Редактирование категории товара'
    : 'Добавление категории товара';

  const defaultValues = category
    ? { ru: category.title.ru, en: category.title.en }
    : { ru: '', en: '' };

  const save = (title: TranslatableStringDto) => {
    const newCategory = {
      title,
      description: {
        ru: '',
        en: '',
      },
      icon: '',
    } as CategoryCreateDto;

    onSave(newCategory);
  };

  return (
    <Modal
      isOpen={isOpen}
      title={modalTitle}
      actions={<ModalActions onCancel={onClose} />}
      onClose={onClose}
    >
      <CreateCategoryForm onSave={save} defaultValues={defaultValues} />
    </Modal>
  );
}
