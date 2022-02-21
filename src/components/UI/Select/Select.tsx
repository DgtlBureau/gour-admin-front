import React, { CSSProperties } from 'react';
import MUISelect from '@mui/material/Select';
import {
  Box, FormControl, InputLabel, MenuItem, SelectChangeEvent,
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
  style: CSSProperties;
};

export function Select({
  id, value, onChange, label, items, style,
}: Props) {
  return (
    <Box sx={style}>
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
