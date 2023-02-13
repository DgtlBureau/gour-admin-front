import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { HFPhoneInput } from 'components/HookForm/HFPhoneInput';
import { Button } from 'components/UI/Button/Button';
import { Modal } from 'components/UI/Modal/Modal';

import { ReferralCodeCreateDto } from 'types/dto/referral/create-code.dto';

import { HFTextField } from '../../HookForm/HFTextField';
import schema from './validation';

type ModalActionsProps = {
  onClose: () => void;
};

export type ReferralCodeCreateModalProps = {
  isOpen: boolean;
  onSave(dto: ReferralCodeCreateDto): void;
  onClose(): void;
};

function ModalActions({ onClose }: ModalActionsProps) {
  return (
    <>
      <Button size='small' type='submit' form='referralCreateForm' sx={{ marginRight: '10px' }}>
        Сохранить
      </Button>
      <Button variant='outlined' size='small' onClick={onClose}>
        Отменить
      </Button>
    </>
  );
}

export function ReferralCodeCreateModal({ isOpen, onSave, onClose }: ReferralCodeCreateModalProps) {
  const values = useForm<ReferralCodeCreateDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  useEffect(() => {
    values.reset({ code: '' });
  }, [isOpen]);

  const submit = (data: ReferralCodeCreateDto) => onSave({
    code: data.code,
    fullName: data.fullName,
    phone: data.phone,
  });

  return (
    <Modal
      isOpen={isOpen}
      title='Добавление реферального кода'
      actions={<ModalActions onClose={onClose} />}
      onClose={onClose}
    >
      <FormProvider {...values}>
        <form id='referralCreateForm' onSubmit={values.handleSubmit(submit)}>
          <HFTextField label='Введите реферальный код' name='code' sx={{ width: '640px', marginBottom: '15px' }} />
          <HFTextField label='Имя агента' name='fullName' sx={{ width: '640px', marginBottom: '15px' }} />
          <HFPhoneInput label='Телефон' name='phone' sx={{ width: '640px' }} />
        </form>
      </FormProvider>
    </Modal>
  );
}
