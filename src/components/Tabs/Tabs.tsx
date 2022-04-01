import React from 'react';
import { Tabs as MUITabs, Tab } from '@mui/material';

export type TabsProps<T extends string = string> = {
  selectedId: T;
  options: {
    id: T;
    label: string;
  }[];
  onChange: (id: T) => void;
};

export function Tabs<T extends string>({ selectedId, options, onChange }: TabsProps<T>) {
  return (
    <MUITabs value={selectedId} onChange={(_, newValue: T) => onChange(newValue)}>
      {options.map(option => (
        <Tab label={option.label} value={option.id} key={option.id} />
      ))}
    </MUITabs>
  );
}
