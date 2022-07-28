import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, Stack } from '@mui/material';

import schema from './validation';
import { Box } from '../../UI/Box/Box';
import { RadioButton } from '../../UI/RadioButton/RadioButton';
import { HFTextField } from '../../HookForm/HFTextField';
import { HFRadioGroup } from '../../HookForm/HFRadioGroup';
import { Typography } from '../../UI/Typography/Typography';
import { SignupUserDto } from '../../../@types/dto/auth/signup-user.dto';

const sx = {
  form: {
    maxWidth: '375px',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  radiosLabel: {
    marginBottom: '14px',
    fontSize: '15px',
  },
  radios: {
    display: 'flex',
    marginTop: '10px',
  },
};

export type CreateUserFormProps = {
  onSubmit: (data: SignupUserDto) => void;
};

export function CreateUserForm({ onSubmit }: CreateUserFormProps) {
  const values = useForm<SignupUserDto>({
    defaultValues: { role: 'admin' },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: SignupUserDto) => onSubmit(data);

  return (
    <FormProvider {...values}>
      <form id="createUserForm" onSubmit={values.handleSubmit(submitHandler)}>
        <Stack spacing={2} sx={sx.form}>
          <HFTextField name="name" label="Имя" />
          <HFTextField name="surname" label="Фамилия" />
          <HFTextField name="email" label="Email" />
          <HFRadioGroup name="role" sx={sx.radioGroup}>
            <Typography variant="body2" color="primary">
              Роль
            </Typography>
            <Box sx={sx.radios}>
              <FormControlLabel
                value="admin"
                control={<RadioButton />}
                label="Администратор"
              />
              <FormControlLabel
                value="moderator"
                control={<RadioButton />}
                label="Модератор"
              />
            </Box>
          </HFRadioGroup>
        </Stack>
      </form>
    </FormProvider>
  );
}
