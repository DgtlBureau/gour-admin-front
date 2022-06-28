import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Modal } from '../../UI/Modal/Modal';
import { Button } from '../../UI/Button/Button';
import { HFTextField } from '../../HookForm/HFTextField';
import { ReferralCodeCreateDto } from '../../../@types/dto/referral/create-code.dto';
import schema from './validation';

type ModalActionsProps = {
  onClose: () => void;
};

export type ReferralCodeCreateModalProps = {
  isOpen: boolean;
  onSave(referralCode: string): void;
  onClose(): void;
};

function ModalActions({ onClose }: ModalActionsProps) {
  return (
    <>
      <Button
        size="small"
        type="submit"
        form="referralCreateForm"
        sx={{ marginRight: '10px' }}
      >
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
  const values = useForm<ReferralCodeCreateDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  useEffect(() => {
    values.reset({ code: '' });
  }, [isOpen]);

  const submit = (data: ReferralCodeCreateDto) => {
    console.log('test');
    onSave(data.code);
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Добавление реферального кода"
      actions={<ModalActions onClose={onClose} />}
      onClose={onClose}
    >
      <FormProvider {...values}>
        <form id="referralCreateForm" onSubmit={values.handleSubmit(submit)}>
          <HFTextField
            label="Введите реферальный код"
            name="code"
            sx={{ width: '640px' }}
          />
        </form>
      </FormProvider>
    </Modal>
  );
}
