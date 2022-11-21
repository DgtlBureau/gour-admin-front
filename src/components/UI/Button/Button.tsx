import React, { ElementType, MouseEvent, ReactNode } from 'react';

import { SxProps } from '@mui/material';
import MUIButton from '@mui/material/Button';

import { ProgressCircular } from '../ProgressCircular/ProgressCircular';

type Props = {
  variant?: 'text' | 'outlined' | 'contained';
  children: ReactNode;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  component?: ElementType;
  fullWidth?: boolean;
  sx?: SxProps;
  form?: string | number;
  href?: string;
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
  href,
  sx,
  form,
}: Props) {
  return (
    <MUIButton
      sx={sx}
      form={form}
      fullWidth={fullWidth}
      type={type}
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      size={size}
      component={component || 'button'}
      href={href}
    >
      {isLoading && (
        <>
          <ProgressCircular size={15} />
          &nbsp;
        </>
      )}
      {children}
    </MUIButton>
  );
}
