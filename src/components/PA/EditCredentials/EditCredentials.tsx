import React from 'react';
import { Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HFTextField } from '../../HookForm/HFTextField';
import { EditCredentialsDto } from '../../../@types/dto/currentUser/edit-credentials.dto';
import { Button } from '../../UI/Button/Button';

import validation from './validation';
import { TextField } from '../../UI/TextField/TextField';

export type Props = {
  defaultValues: EditCredentialsDto;
  onSubmit: (data: EditCredentialsDto) => void;
};

export function PAEditCredentials({ defaultValues, onSubmit }: Props) {
  const values = useForm<EditCredentialsDto>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validation),
  });

  const resetValues = () => values.reset();

  const { isDirty } = values.formState;

  return (
    <Stack sx={{ width: '500px' }}>
      <FormProvider {...values}>
        <form onSubmit={values.handleSubmit(onSubmit)}>
          <HFTextField sx={{ margin: '15px 0 0 0' }} label="Имя" name="firstName" />
          <HFTextField sx={{ margin: '15px 0 0 0' }} label="Фамилия" name="lastName" />
          <HFTextField sx={{ margin: '15px 0 0 0' }} label="Email" name="email" />
          <Stack sx={{ margin: '15px 0 0 0' }} flexDirection="row">
            <Button sx={{ margin: '0 10px 0 0' }} type="submit" disabled={!isDirty}>
              Сохранить
            </Button>
            <Button disabled={!isDirty} onClick={resetValues}>
              Отменить
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
}
