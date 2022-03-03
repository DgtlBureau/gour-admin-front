import React from 'react';
import MUISelect from '@mui/material/Select';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  SxProps,
} from '@mui/material';

type SelectItem = {
  value: string;
  label: string;
};

type Props = {
  id: string;
  value?: 'string' | undefined;
  label: string;
  onChange: (e: SelectChangeEvent) => void;
  items: SelectItem[];
  sx: SxProps;
};

export function Select({ id, value, onChange, label, items, sx }: Props) {
  return (
    <Box sx={sx}>
      <FormControl fullWidth>
        <InputLabel id={id}>{label}</InputLabel>
        <MUISelect labelId={id} id={id} value={value} label={label} onChange={onChange}>
          {items.map(item => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </MUISelect>
      </FormControl>
    </Box>
  );
}
