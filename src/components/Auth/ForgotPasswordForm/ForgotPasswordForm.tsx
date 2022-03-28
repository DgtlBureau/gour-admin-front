import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../UI/Button/Button';
import { Box } from '../../UI/Box/Box';
import { HFTextField } from '../../HookForm/HFTextField';

import schema from './validation';

import { Typography } from '../../UI/Typography/Typography';
import { ForgotPasswordDto } from '../../../@types/dto/auth/forgot-password.dto';

const boxSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 3,
  padding: '25px',
  borderRadius: '5px',
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
          <HFTextField sx={sxInput} name="login" label="Логин" />
          <Button
            isLoading={isLoading}
            disabled={isDisabledBtn}
            sx={sxBtn}
            type="submit"
            fullWidth
          >
            Отправить
          </Button>
          <p>
            <Link to="/auth/signin">Я не забыл пароль =]</Link>
          </p>
        </Box>
      </form>
    </FormProvider>
  );
}
