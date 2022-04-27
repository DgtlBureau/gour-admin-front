import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Modal } from '../../UI/Modal/Modal';
import { Button } from '../../UI/Button/Button';
import { HFTextField } from '../../HookForm/HFTextField';
import { RefferalCodeCreateDto } from '../../../@types/dto/refferal/create-code.dto';
import schema from './validation';

type ModalActionsProps = {
  onClose: () => void,
};

export type ReferralCodeCreateModalProps = {
  isOpen: boolean;
  onSave(refferalCode: { code: string }): void;
  onClose(): void;
};

function ModalActions({ onClose }: ModalActionsProps) {
  return (
    <>
      <Button size="small" type="submit" form="refferalCreateForm" sx={{ marginRight: '10px' }}>
        Сохранить
      </Button>
      <Button variant="outlined" size="small" onClick={onClose}>
        Отменить
      </Button>
    </>
  );
}

export function ReferralCodeCreateModal({
  isOpen,
  onSave,
  onClose,
}: ReferralCodeCreateModalProps) {
  const values = useForm<RefferalCodeCreateDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const submit = (data: RefferalCodeCreateDto) => onSave({ code: data.code });

  return (
    <Modal
      isOpen={isOpen}
      title="Добавление реферального кода"
      body={(
        <FormProvider {...values}>
          <form id="refferalCreateForm" onSubmit={values.handleSubmit(submit)}>
            <HFTextField label="Введите реферальный код" name="code" sx={{ width: '640px' }} />
          </form>
        </FormProvider>
      )}
      actions={<ModalActions onClose={onClose} />}
      onClose={onClose}
    />
  );
}