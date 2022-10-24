import React, { ReactNode } from 'react';

import { SxProps } from '@mui/material';
import MUIBox from '@mui/material/Box';

type Props = {
  children: ReactNode;
  sx?: SxProps;
};

export function Box({ children, sx }: Props) {
  return <MUIBox sx={sx}>{children}</MUIBox>;
}
