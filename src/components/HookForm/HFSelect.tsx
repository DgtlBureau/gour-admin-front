import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, SelectOption } from '../UI/Select/Select';

type Props<V> = {
  name: string;
  placeholder: string;
  options: SelectOption<V>[];
  defaultValue?: SelectOption<V>['value'];
  type?: string;
  label?: string;
};

export function HFSelect<V>({ name, defaultValue, ...props }: Props<V>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field: { ref, onChange, ...rest } }) => (
        <Select
          {...rest}
          isMulti={false}
          onChange={newValue => onChange(newValue?.value)}
          isError={!!errors[name]}
          error={errors[name]?.message ?? ''}
          {...props}
        />
      )}
    />
  );
}
