import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Select, SelectOption } from 'components/UI/Select/Select';

type Props = {
  name: string;
  placeholder: string;
  options: SelectOption[];
  defaultValue?: SelectOption['value'];
  type?: string;
  label?: string;
  sx?: SxProps;
  onChange?: (value: SelectOption['value']) => void;
};

export function HFSelect({ name, defaultValue, sx, ...props }: Props) {
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
        render={({ field: { ref: _ref, onChange, ...rest } }) => (
          <Select
            {...rest}
            onChange={value => {
              if (props.onChange) props.onChange(value);
              else onChange(value);
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
