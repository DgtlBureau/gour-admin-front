import React from 'react';

import { SxProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MUISelect, { SelectChangeEvent } from '@mui/material/Select';

import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';

export type SelectOption = {
  value: string;
  label?: string;
};

type Props = {
  error?: string;
  isError?: boolean;
  options: SelectOption[];
  isDisabled?: boolean;
  label?: string;
  sx?: SxProps;
  value?: string[];
  onChange: (value: string[]) => void;
};

export function Multiselect({ value = [], options, error, isError, label, sx, isDisabled, onChange }: Props) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const newValue = event.target.value;
    onChange(typeof newValue === 'string' ? newValue.split(',') : newValue);
  };

  return (
    <Box sx={{ minWidth: 120, ...sx }}>
      <FormControl fullWidth>
        <InputLabel id='select-label'>{label}</InputLabel>
        <MUISelect
          labelId='select-label'
          id='select'
          value={value}
          label={label}
          error={isError}
          multiple
          disabled={isDisabled}
          onChange={handleChange}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MUISelect>
      </FormControl>

      {error && (
        <Typography variant='body2' color='error'>
          {error}
        </Typography>
      )}
    </Box>
  );
}
