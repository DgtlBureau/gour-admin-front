import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { EditPasswordDto } from '../../../@types/dto/currentUser/edit-password.dto';
import { HFTextField } from '../../HookForm/HFTextField';
import { Box } from '../../UI/Box/Box';
import { Button } from '../../UI/Button/Button';
import validation from './validation';

type Props = {
  onSubmit: (data: EditPasswordDto) => void;
};

export function PAEditPassword({ onSubmit }: Props) {
  const values = useForm<EditPasswordDto>({
    mode: 'onChange',
    resolver: yupResolver(validation),
  });

  const { isValid } = values.formState;

  return (
    <Box sx={{ width: '500px' }}>
      <FormProvider {...values}>
        <form onSubmit={values.handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <HFTextField
              sx={{ margin: '15px 0 0 0' }}
              label="Пароль"
              type="password"
              name="prevPassword"
            />
            <HFTextField
              sx={{ margin: '15px 0 0 0' }}
              label="Новый пароль"
              type="password"
              name="newPassword"
            />
            <HFTextField
              sx={{ margin: '15px 0 0 0' }}
              label="Повторите новый пароль"
              type="password"
              name="repeatNewPassword"
            />
            <Button disabled={!isValid} sx={{ margin: '15px 0 0 0' }} type="submit">
              Сменить пароль
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
}
