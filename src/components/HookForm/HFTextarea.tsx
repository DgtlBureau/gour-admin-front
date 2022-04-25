import React, { CSSProperties } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Textarea } from '../UI/Textarea/Textarea';

type Props = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
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
        <Textarea
          {...rest}
          isError={!!errors[name]}
          error={errors[name]?.message ?? ''}
          {...props}
        />
      )}
    />
  );
}
