import React from 'react';
import { SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { Box } from '../UI/Box/Box';

import { Multiselect, SelectOption } from '../UI/Multiselect/Multiselect';

type Props = {
  name: string;
  placeholder: string;
  options: SelectOption[];
  defaultValue?: SelectOption['value'][];
  type?: string;
  label?: string;
  sx?: SxProps;
  onChange?: (value: SelectOption['value'][]) => void;
};

export function HFMultiselect({ name, defaultValue, sx, ...props }: Props) {
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
          <Multiselect
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
