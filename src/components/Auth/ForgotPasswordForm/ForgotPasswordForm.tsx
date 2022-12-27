import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Path } from 'constants/routes';

import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Link as CustomLink } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { ForgotPasswordDto } from 'types/dto/auth/forgot-password.dto';

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
  minWidth: '300px',
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
  onSubmit: SubmitHandler<ForgotPasswordDto>;
  isLoading: boolean;
};

export function AuthForgotPasswordForm({ onSubmit, isLoading }: Props) {
  const values = useForm<ForgotPasswordDto>({
    resolver: yupResolver(schema),
  });

  const isDisabledBtn = isLoading;

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(onSubmit)}>
        <Box sx={boxSx}>
          <Typography sx={sxTitle}>Забыли пароль</Typography>
          <HFTextField sx={sxInput} name='login' label='Логин' />
          <Button isLoading={isLoading} disabled={isDisabledBtn} sx={sxBtn} type='submit' fullWidth>
            Отправить
          </Button>
          <p>
            <CustomLink href={`${Path.AUTH}/${Path.SIGNIN}`}>Я не забыл пароль =]</CustomLink>
          </p>
        </Box>
      </form>
    </FormProvider>
  );
}
