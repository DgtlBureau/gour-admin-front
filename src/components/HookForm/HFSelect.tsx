import React from 'react';
import { SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { SingleValue } from 'react-select';

import { Box } from '../UI/Box/Box';
import { Select, SelectOption } from '../UI/Select/Select';

type Props<V> = {
  name: string;
  placeholder: string;
  options: SelectOption<V>[];
  defaultValue?: SelectOption<V>['value'];
  type?: string;
  label?: string;
  sx?: SxProps;
  onChange?: (value: SingleValue<SelectOption<any>>) => void;
};

export function HFSelect<V>({ name, defaultValue, sx, ...props }: Props<V>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box sx={sx}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ''}
        render={({ field: { ref, onChange, ...rest } }) => (
          <Select
            {...rest}
            isMulti={false}
            onChange={newValue => {
              if (props.onChange) props.onChange(newValue?.value);
              else onChange(newValue?.value);
            }}
            isError={!!errors[name]}
            error={errors[name]?.message ?? ''}
            {...props}
          />
        )}
      />
    </Box>
  );
}
