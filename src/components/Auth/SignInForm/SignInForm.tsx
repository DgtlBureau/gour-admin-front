import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../UI/Button/Button';
import { Box } from '../../UI/Box/Box';
import { HFTextField } from '../../HookForm/HFTextField';

import schema from './validation';
import { SignInDto } from '../../../@types/dto/signin.dto';
import { Typography } from '../../UI/Typography/Typography';
import { ProgressCircular } from '../../UI/ProgressCircular/ProgressCircular';

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
  onSubmit: SubmitHandler<SignInDto>;
  isLoading: boolean;
};

export function SignInForm({ onSubmit, isLoading }: Props) {
  const values = useForm<SignInDto>({
    resolver: yupResolver(schema),
  });

  const isDisabledBtn = isLoading;

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(onSubmit)}>
        <Box sx={boxSx}>
          <Typography sx={sxTitle}>Вход</Typography>
          <HFTextField sx={sxInput} name="login" label="Логин" />
          <HFTextField sx={sxInput} label="Пароль" name="password" type="password" />
          <Button disabled={isDisabledBtn} sx={sxBtn} type="submit" fullWidth>
            Войти &nbsp;
            {isLoading ? <ProgressCircular size={15} /> : ''}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
}
