import React, { ReactNode } from 'react';
import { SxProps } from '@mui/material';
import MUIContainer from '@mui/material/Container';

type Props = {
  sx?: SxProps;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
};

export function Container({ maxWidth, sx, children }: Props) {
  return (
    <MUIContainer sx={sx} maxWidth={maxWidth}>
      {children}
    </MUIContainer>
  );
}
