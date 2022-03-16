import React from 'react';
import {
  SxProps,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const sxRadio = {
  '&.Mui-checked': {
    color: '#25262D',
  },
};

type Props = {
  name: string;
  options: {
    label: string;
    value: string | number | boolean;
  }[],
  defaultValue?: string | number | boolean;
  label?: string;
  sx?: SxProps;
  onChange?: (value: string) => void;
};

export function HFRadioGroup({ name, label, options, defaultValue, sx, ...props }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field: { onChange, value } }) => (
        <Box sx={sx}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup
            row
            value={value}
            onChange={(e, val) => (props.onChange && props.onChange(val)) || onChange(e, val)}
          >
            {
              options.map(option => (
                <FormControlLabel
                  key={option.label}
                  label={option.label}
                  value={option.value}
                  control={<Radio sx={sxRadio} />}
                />
              ))
            }
          </RadioGroup>
        </Box>
      )}
    />
  );
}
