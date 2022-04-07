import React, { CSSProperties } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Textarea } from '../UI/Textarea/Textarea';
import { TextField } from '../UI/TextField/TextField';

type Props = {
  name: string;
  defaultValue?: string;
  placeholder: string;
  label?: string;
  type?: string;
  sx?: CSSProperties;
};

export function HFTextarea({ name, defaultValue, ...props }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field: { ref, ...rest } }) => (
        <TextField
          {...rest}
          multiline
          isError={!!errors[name]}
          helperText={errors[name]?.message ?? ''}
          {...props}
        />
      )}
    />
  );
}
