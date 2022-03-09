import React from 'react';
import MUILinearProgress from '@mui/material/LinearProgress';
import { SxProps } from '@mui/material';

type Props = {
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | undefined;
  value?: number;
  variant: 'buffer' | 'determinate' | 'indeterminate' | 'query';
  valueBuffer?: number;
  sx?: SxProps;
};

export function ProgressLinear({ color, sx, value, valueBuffer, variant }: Props) {
  return (
    <MUILinearProgress
      color={color}
      sx={sx}
      value={value}
      valueBuffer={valueBuffer}
      variant={variant}
    />
  );
}
