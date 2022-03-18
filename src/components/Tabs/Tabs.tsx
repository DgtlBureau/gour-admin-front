import React from 'react';
import { Tabs as MUITabs, Tab } from '@mui/material';

type Props = {
  selectedId: number;
  options: {
    id: number;
    label: string;
  }[];
  onChange: (id: number) => void;
};

export function Tabs({ selectedId, options, onChange }: Props) {
  return (
    <MUITabs value={selectedId} onChange={(_, newValue: number) => onChange(newValue)}>
      {options.map(option => (
        <Tab key={option.id} label={option.label} value={option.id} />
      ))}
    </MUITabs>
  );
}
