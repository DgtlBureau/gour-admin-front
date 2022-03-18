import React, { ReactNode } from 'react';
import MUIBox from '@mui/material/Box';
import { SxProps } from '@mui/material';

type Props = {
  children: ReactNode;
  sx?: SxProps;
};

export function Box({ children, sx }: Props) {
  return <MUIBox sx={sx}>{children}</MUIBox>;
}
