import React from 'react';
import { SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '../UI/TextField/TextField';
import { TextEditor } from '../UI/TextEditor/TextEditor';

type Props = {
  name: string;
  defaultValue?: string;
  label?: string;
  sx?: SxProps;
};

export function HFTextEditor({ name, defaultValue, ...props }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field: { ref, onChange, value } }) => (
        <TextEditor
          value={value}
          onChange={onChange}
          isError={!!errors[name]}
          helperText={errors[name]?.message ?? ''}
          {...props}
        />
      )}
    />
  );
}
