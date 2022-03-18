import React, { ElementType, ReactNode } from 'react';
import MUIButton from '@mui/material/Button';
import { SxProps } from '@mui/material';
import { ProgressCircular } from '../ProgressCircular/ProgressCircular';

type Props = {
  variant?: 'text' | 'outlined' | 'contained';
  children: ReactNode;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
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
  isLoading = false,
  size,
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
      size={size}
      component={component || 'button'}
    >
      {isLoading ? <ProgressCircular size={15} /> : ''}
      &nbsp;
      {children}
    </MUIButton>
  );
}
