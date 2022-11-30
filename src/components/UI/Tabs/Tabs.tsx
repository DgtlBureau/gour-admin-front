import React from 'react';

import { Tabs as MUITabs, SxProps, Tab } from '@mui/material';

const tabSx = {
  minWidth: 0,
};

export type TabsProps<T> = {
  value: T;
  options: {
    value: T;
    label: string;
  }[];
  sx?: SxProps;
  onChange: (val: T) => void;
};

export function Tabs<T = string | number>({ value, options, sx, onChange }: TabsProps<T>) {
  return (
    <MUITabs
      color='accent.main'
      variant='scrollable'
      scrollButtons='auto'
      value={value}
      onChange={(_, newValue: T) => onChange(newValue)}
      sx={sx}
    >
      {options.map(option => (
        <Tab sx={tabSx} label={option.label} value={option.value} key={String(option.value)} color='secondary' />
      ))}
    </MUITabs>
  );
}