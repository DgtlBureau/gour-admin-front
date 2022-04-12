import React from 'react';
import { Tabs as MUITabs, Tab } from '@mui/material';

export type TabsProps = {
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
};

export function Tabs({ value, options, onChange }: TabsProps) {
  return (
    <MUITabs value={value} onChange={(_, newValue: string) => onChange(newValue)}>
      {options.map(option => (
        <Tab label={option.label} value={option.value} key={option.value} />
      ))}
    </MUITabs>
  );
}
