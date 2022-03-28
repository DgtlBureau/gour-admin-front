import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormLabel, FormControlLabel, Radio } from '@mui/material';

import schema from './validation';
import { Box } from '../UI/Box/Box';
import { Button } from '../UI/Button/Button';
import { HFTextField } from '../HookForm/HFTextField';
import { HFRadioGroup } from '../HookForm/HFRadioGroup';

const sx = {
  form: {
    display: 'flex',
    alignItems: 'center',
  },
  field: {
    maxWidth: '320px',
    marginLeft: '55px',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  radiosLabel: {
    marginBottom: '14px',
    fontSize: '15px',
    color: '#25262D',
  },
  radios: {
    display: 'flex',
  },
  radio: {
    '&.Mui-checked': {
      color: '#25262D',
    },
  },
};

export type UserFields = {
  role: 'admin' | 'moderator';
  email: string;
}

export type CreateUserFormProps = {
  user: UserFields;
  onSubmit: (data: UserFields) => void;
}

export function CreateUserForm({
  user,
  onSubmit,
}: CreateUserFormProps) {
  const values = useForm<UserFields>({
    defaultValues: user,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: UserFields) => onSubmit(data);

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submitHandler)}>
        <Box sx={sx.form}>
          <HFRadioGroup name="role" sx={sx.radioGroup}>
            <FormLabel sx={sx.radiosLabel}>Роль</FormLabel>

            <Box sx={sx.radios}>
              <FormControlLabel value="admin" control={<Radio sx={sx.radio} />} label="Администратор" />
              <FormControlLabel value="moderator" control={<Radio sx={sx.radio} />} label="Модератор" />
            </Box>
          </HFRadioGroup>

          <HFTextField sx={sx.field} name="email" label="Email" />

          {/* delete later */}
          <Button type="submit" sx={{ marginLeft: '55px' }}>
            Сохранить
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
}
