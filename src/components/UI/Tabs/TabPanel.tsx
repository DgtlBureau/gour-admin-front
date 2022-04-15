import React from 'react';
import { Box } from '../Box/Box';

interface Props {
  children?: React.ReactNode;
  index: string;
  value: string;
}

export function TabPanel({ children, value, index, ...other }: Props) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}
