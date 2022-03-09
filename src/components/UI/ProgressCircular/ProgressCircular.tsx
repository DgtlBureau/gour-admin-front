import React from 'react';
import MUICircularProgress from '@mui/material/CircularProgress';
import { SxProps } from '@mui/material';

type Props = {
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit'
    | undefined;
  size?: number;
  disableShrink?: boolean;
  thickness?: number;
  value?: number;
  sx?: SxProps;
  variant?: 'determinate' | 'indeterminate';
};

export function ProgressCircular({
  color,
  size,
  disableShrink,
  thickness,
  value,
  sx,
  variant,
}: Props) {
  return (
    <MUICircularProgress
      sx={sx}
      value={value}
      thickness={thickness}
      disableShrink={disableShrink}
      size={size}
      color={color}
      variant={variant}
    />
  );
}
