import React, { CSSProperties, ReactNode } from 'react';
import MUIBox from '@mui/material/Box';

export type Props = {
  sx: CSSProperties;
  children: ReactNode;
};

export function Box({ sx, children }: Props) {
  return <MUIBox sx={sx}>{children}</MUIBox>;
}
