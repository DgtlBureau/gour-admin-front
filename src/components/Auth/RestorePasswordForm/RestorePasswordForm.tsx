import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import { RestorePasswordDto } from 'types/dto/auth/restore-password.dto';

import { HFTextField } from '../../HookForm/HFTextField';
import schema from './validation';

const boxSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 3,
  padding: '25px',
  borderRadius: '5px',
  width: '500px',
};

const sxInput = {
  marginBottom: '15px',
};

const sxBtn = {
  height: '46px',
};

const sxTitle = {
  marginBottom: '15px',
};

type Props = {
  onSubmit: SubmitHandler<RestorePasswordDto>;
  isLoading: boolean;
};

export function AuthRestorePasswordForm({ onSubmit, isLoading }: Props) {
  const values = useForm<RestorePasswordDto>({
    resolver: yupResolver(schema),
  });

  const isDisabledBtn = isLoading;

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(onSubmit)}>
        <Box sx={boxSx}>
          <Typography sx={sxTitle}>Смена пароля </Typography>
          <HFTextField sx={sxInput} name='password' label='Пароль' type='password' />
          <HFTextField sx={sxInput} name='verificationPassword' label='Подтвердите пароль' type='password' />
          <Button isLoading={isLoading} disabled={isDisabledBtn} sx={sxBtn} type='submit' fullWidth>
            Изменить
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
}
