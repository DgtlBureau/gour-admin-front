import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, Stack } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { RadioButton } from 'components/UI/RadioButton/RadioButton';
import { Typography } from 'components/UI/Typography/Typography';

import { UserCreateDto } from 'types/dto/user/create.dto';

import { HFRadioGroup } from '../../HookForm/HFRadioGroup';
import { HFTextField } from '../../HookForm/HFTextField';
import sx from './CreateForm.styles';
import schema from './validation';

export type CreateUserFormProps = {
  roles: {
    value: string;
    label: string;
  }[];
  onSubmit: (data: UserCreateDto) => void;
};

export function CreateUserForm({ roles, onSubmit }: CreateUserFormProps) {
  const values = useForm<UserCreateDto>({
    defaultValues: { role: roles[0]?.value },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: UserCreateDto) => onSubmit(data);

  return (
    <FormProvider {...values}>
      <form id='createUserForm' onSubmit={values.handleSubmit(submitHandler)}>
        <Stack spacing={2} sx={sx.form}>
          <HFTextField name='name' label='Имя' />

          <HFTextField name='lastName' label='Фамилия' />

          <HFTextField name='email' label='Email' />

          <HFRadioGroup name='role' sx={sx.radioGroup}>
            <Typography variant='body2' color='primary'>
              Роль
            </Typography>

            <Box sx={sx.radios}>
              {roles.map(role => (
                <FormControlLabel
                  disabled={roles.length === 1}
                  value={role.value}
                  label={role.label}
                  control={<RadioButton />}
                />
              ))}
            </Box>
          </HFRadioGroup>
        </Stack>
      </form>
    </FormProvider>
  );
}
