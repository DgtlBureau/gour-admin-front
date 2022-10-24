import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { SxProps } from '@mui/material';

import { DatePicker } from 'components/UI/DataPicker/DatePicker';

type Props = {
  name: string;
  defaultValue?: string;
  label?: string;
  type?: string;
  sx?: SxProps;
};

export function HFDatePicker({ name, defaultValue, ...props }: Props) {
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
        <DatePicker {...rest} isError={!!errors[name]} helperText={errors[name]?.message ?? ''} {...props} />
      )}
    />
  );
}
