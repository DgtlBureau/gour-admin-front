import React, { ElementType, ReactNode } from 'react';
import MUIButton from '@mui/material/Button';

type Props = {
  variant: 'text' | 'outlined' | 'contained' | undefined;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onCLick?: () => void;
  disabled?: boolean;
  component?: ElementType;
};

export function Button({
  variant,
  children,
  type,
  onCLick,
  disabled,
  component,
}: Props) {
  return (
    <MUIButton
      type={type}
      disabled={disabled}
      onClick={onCLick}
      variant={variant}
      component={component || 'button'}
    >
      {children}
    </MUIButton>
  );
}
