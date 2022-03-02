import React, { ElementType, ReactNode } from 'react';
import MUIButton from '@mui/material/Button';

type Props = {
  variant: 'text' | 'outlined' | 'contained' | undefined;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  component?: ElementType;
};

export function Button({
  variant, children, type, onClick, disabled, component,
}: Props) {
  return (
    <MUIButton
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
