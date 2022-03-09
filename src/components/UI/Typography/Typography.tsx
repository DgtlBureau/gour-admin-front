import React, { ReactNode } from 'react';
import MUITypography from '@mui/material/Typography';
import { SxProps } from '@mui/material';

type Props = {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'inherit'
    | undefined;
  children: ReactNode;
  sx?: SxProps;
};

export function Typography({ variant = 'h4', children, sx }: Props) {
  return (
    <MUITypography sx={sx} variant={variant}>
      {children}
    </MUITypography>
  );
}
