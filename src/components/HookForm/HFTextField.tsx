import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { SxProps } from '@mui/material';

import { TextField } from 'components/UI/TextField/TextField';

type Props = {
  name: string;
  defaultValue?: string;
  multiline?: boolean;
  label?: string;
  type?: string;
  rows?: number;
  sx?: SxProps;
};

export function HFTextField({ name, defaultValue, ...props }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field: { ref: _ref, ...rest } }) => (
        <TextField {...rest} isError={!!errors[name]} helperText={errors[name]?.message ?? ''} {...props} />
      )}
    />
  );
}
