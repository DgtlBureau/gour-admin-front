import React from 'react';
import { Tabs as MUITabs, Tab } from '@mui/material';

export type TabsProps = {
  selectedId: string;
  options: {
    id: string;
    label: string;
  }[];
  onChange: (id: string) => void;
};

export function Tabs({ selectedId, options, onChange }: TabsProps) {
  return (
    <MUITabs value={selectedId} onChange={(_, newValue: string) => onChange(newValue)}>
      {options.map(option => (
        <Tab label={option.label} value={option.id} key={option.id} />
      ))}
    </MUITabs>
  );
}
