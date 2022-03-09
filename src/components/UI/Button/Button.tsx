import React, { ElementType, ReactNode } from 'react';
import MUIButton from '@mui/material/Button';
import { SxProps } from '@mui/material';

type Props = {
  variant?: 'text' | 'outlined' | 'contained';
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  component?: ElementType;
  fullWidth?: boolean;
  sx?: SxProps;
};

export function Button({
  variant = 'contained',
  children,
  type,
  onClick,
  disabled,
  component,
  fullWidth,
  sx,
}: Props) {
  return (
    <MUIButton
      sx={sx}
      fullWidth={fullWidth}
      type={type}
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      component={component || 'button'}
    >
      {children}
    </MUIButton>
  );
}
