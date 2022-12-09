import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from 'components/UI/Button/Button';
import { Modal } from 'components/UI/Modal/Modal';

import { AddCoinsDto } from 'types/dto/add-coins.dto';

import { HFTextField } from '../../HookForm/HFTextField';
import { schema } from './validation';

type Props = {
  title: string;
  isOpened: boolean;
  defaultValues?: AddCoinsDto;
  onSubmit: (data: AddCoinsDto) => void;
  onClose: () => void;
};

const sx = {
  button: {
    margin: '10px 0 0 0',
  },
};

export function UserAddCheesecoinsModal({ isOpened, title, defaultValues, onSubmit, onClose }: Props) {
  const values = useForm<AddCoinsDto>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <Modal
      isOpen={isOpened}
      acceptText='Сохранить'
      title={title}
      onAccept={() => values.handleSubmit(onSubmit)}
      onClose={onClose}
    >
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
