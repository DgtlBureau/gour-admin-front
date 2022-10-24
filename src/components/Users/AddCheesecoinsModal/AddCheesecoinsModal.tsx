import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from 'components/UI/Button/Button';
import { Modal } from 'components/UI/Modal/Modal';

import { AddCheesecoinsDto } from 'types/dto/add-cheesecoins.dto';

import { HFTextField } from '../../HookForm/HFTextField';
import { schema } from './validation';

type Props = {
  isOpened: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (data: AddCheesecoinsDto) => void;
};

const sx = {
  button: {
    margin: '10px 0 0 0',
  },
};

export function UserAddCheesecoinsModal({ isOpened, onClose, title, onSubmit }: Props) {
  const values = useForm<AddCheesecoinsDto>({
    resolver: yupResolver(schema),
  });

  return (
    <Modal isOpen={isOpened} title={title} onClose={onClose}>
      <FormProvider {...values}>
        <form onSubmit={values.handleSubmit(onSubmit)}>
          <HFTextField name='count' type='number' />
          <Button type='submit' sx={sx.button}>
            Добавить
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
}
