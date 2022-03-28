import React from 'react';
import { Tabs as MUITabs, Tab } from '@mui/material';

export type TabsProps = {
  selectedId: number;
  options: {
    id: number;
    label: string;
  }[];
  onChange: (id: number) => void;
}

export function Tabs({
  selectedId,
  options,
  onChange,
}: TabsProps) {
  return (
    <MUITabs value={selectedId} onChange={(_, newValue: number) => onChange(newValue)}>
      {
        options.map(option => <Tab label={option.label} value={option.id} />)
      }
    </MUITabs>
  );
}
