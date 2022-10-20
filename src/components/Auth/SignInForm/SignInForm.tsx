import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Link as CustomLink } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { SignInDto } from 'types/dto/auth/signin.dto';

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
  width: '300px',
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
  onSubmit: SubmitHandler<SignInDto>;
  isLoading: boolean;
};

export function AuthSignInForm({ onSubmit, isLoading }: Props) {
  const values = useForm<SignInDto>({
    resolver: yupResolver(schema),
  });

  const isDisabledBtn = isLoading;

  const submitHandler = (data: SignInDto) => {
    onSubmit(data);
    values.setValue('password', '');
  };

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submitHandler)}>
        <Box sx={boxSx}>
          <Typography sx={sxTitle}>Вход</Typography>
          <HFTextField sx={sxInput} name='login' label='Логин' />
          <HFTextField sx={sxInput} label='Пароль' name='password' type='password' />
          <Button isLoading={isLoading} disabled={isDisabledBtn} sx={sxBtn} type='submit' fullWidth>
            Войти
          </Button>
          <p>
            <CustomLink path='/auth/forgot-password'>Забыли пароль?</CustomLink>
          </p>
        </Box>
      </form>
    </FormProvider>
  );
}
