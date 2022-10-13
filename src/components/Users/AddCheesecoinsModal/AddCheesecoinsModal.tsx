import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AddCheesecoinsDto } from '../../../@types/dto/add-cheesecoins.dto';
import { HFTextField } from '../../HookForm/HFTextField';
import { Button } from '../../UI/Button/Button';
import { Modal } from '../../UI/Modal/Modal';
import { schema } from './validation';

type Props = {
  title: string;
  isOpened: boolean;
  defaultValues?: AddCheesecoinsDto;
  onSubmit: (data: AddCheesecoinsDto) => void;
  onClose: () => void;
};

const sx = {
  button: {
    margin: '10px 0 0 0',
  },
};

export function UserAddCheesecoinsModal({
  isOpened,
  title,
  defaultValues,
  onSubmit,
  onClose,
}: Props) {
  const values = useForm<AddCheesecoinsDto>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <Modal
      isOpen={isOpened}
      acceptText="Сохранить"
      title={title}
      onAccept={() => values.handleSubmit(onSubmit)}
      onClose={onClose}
    >
      <FormProvider {...values}>
        <form onSubmit={values.handleSubmit(onSubmit)}>
          <HFTextField name="count" type="number" />
        </form>
      </FormProvider>
    </Modal>
  );
}
