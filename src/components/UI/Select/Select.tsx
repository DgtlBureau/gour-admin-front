import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MUISelect, { SelectChangeEvent } from '@mui/material/Select';
import { SxProps } from '@mui/material';

import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';

export type SelectOption = {
  value: string | number;
  label?: string;
};

type Props = {
  onChange: (value: string | number) => void;
  value?: string | number;
  error?: string;
  isError?: boolean;
  options: SelectOption[];
  isDisabled?: boolean;
  label?: string;
  sx?: SxProps;
};

export function Select({
  value,
  options,
  error,
  isError,
  label,
  sx,
  isDisabled,
  onChange,
}: Props) {
  const isNumberValue = typeof value === 'number';

  const change = (event: SelectChangeEvent) => {
    const selectValue = event.target.value;
    onChange(isNumberValue ? +selectValue : selectValue);
  };

  return (
    <Box sx={{ minWidth: 120, ...sx }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <MUISelect
          labelId="select-label"
          id="select"
          value={isNumberValue ? value.toString() : value}
          label={label}
          error={isError}
          disabled={isDisabled}
          onChange={change}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MUISelect>
      </FormControl>

      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
}
