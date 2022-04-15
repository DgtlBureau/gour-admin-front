import React from 'react';
import { Tabs as MUITabs, Tab } from '@mui/material';

export type TabsProps = {
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (val: string) => void;
};

export function Tabs({ value, options, onChange }: TabsProps) {
  return (
    <MUITabs
      color="accent.main"
      value={value}
      onChange={(_, newValue: string) => onChange(newValue)}
    >
      {
        options.map(option => (
          <Tab label={option.label} value={option.value} key={option.value} color="secondary" />
        ))
      }
    </MUITabs>
  );
}
