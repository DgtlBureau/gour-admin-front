import React from 'react';
import { Tabs as MUITabs, Tab, SxProps } from '@mui/material';

const tabSx = {
  minWidth: 0,
};

export type TabsProps = {
  value: string | number;
  options: {
    value: string | number;
    label: string;
  }[];
  sx?: SxProps;
  onChange: (val: string) => void;
};

export function Tabs({ value, options, sx, onChange }: TabsProps) {
  return (
    <MUITabs
      color="accent.main"
      value={value}
      onChange={(_, newValue: string) => onChange(newValue)}
      sx={sx}
    >
      {options.map(option => (
        <Tab
          sx={tabSx}
          label={option.label}
          value={option.value}
          key={option.value}
          color="secondary"
        />
      ))}
    </MUITabs>
  );
}
