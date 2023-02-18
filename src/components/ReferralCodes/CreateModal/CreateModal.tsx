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
  defaultValues: ReferralCodeCreateDto;
  isOpen: boolean;

  onSave(dto: ReferralCodeCreateDto): void;

  onClose(): void;
  mode: 'create' | 'edit' | 'closed';
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

export function ReferralCodeCreateModal({
  defaultValues,
  isOpen,
  onSave,
  onClose,
  mode,
}: ReferralCodeCreateModalProps) {
  const values = useForm<ReferralCodeCreateDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  useEffect(() => {
    values.reset({ code: '' });

    if (mode === 'edit') {
      values.setValue('code', defaultValues.code);
      values.setValue('fullName', defaultValues.fullName);
      values.setValue('phone', defaultValues.phone);
    }
  }, [isOpen]);

  const submit = (data: ReferralCodeCreateDto) =>
    onSave({
      code: data.code,
      fullName: data.fullName,
      phone: data.phone,
    });

  return (
    <Modal
      isOpen={isOpen}
      title={mode === 'create' ? 'Добавление реферального кода' : 'Редактирование реферального кода'}
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
