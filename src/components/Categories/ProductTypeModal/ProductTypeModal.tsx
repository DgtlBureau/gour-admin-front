import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Category, TopLevelCategory } from '../../../@types/entities/Category';
import { HFTextField } from '../../HookForm/HFTextField';
import { Button } from '../../UI/Button/Button';
import { Modal } from '../../UI/Modal/Modal';

import schema from './validation';

type FormType = {
  title: string;
};

type Props = {
  isOpen?: boolean;
  productType?: TopLevelCategory;
  onClose: () => void;
  onSave: (data: FormType) => void;
};

type ModalActionsProps = {
  onCancel: () => void;
};

function ModalActions({ onCancel }: ModalActionsProps) {
  return (
    <>
      <Button
        form="createProductTypeForm"
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

export function ProductTypeModal({ isOpen, productType, onClose, onSave }: Props) {
  const values = useForm<FormType>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    values.setValue('title', productType?.title.ru || '');
  }, [productType]);

  return (
    <Modal
      isOpen={!!isOpen}
      title={productType ? 'Редактирование типа продукта' : 'Создание типа продукта'}
      onClose={onClose}
      actions={<ModalActions onCancel={onClose} />}
    >
      <FormProvider {...values}>
        <form id="createProductTypeForm" onSubmit={values.handleSubmit(onSave)}>
          <HFTextField name="title" />
        </form>
      </FormProvider>
    </Modal>
  );
}
