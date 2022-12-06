import React, { ElementType, ReactNode } from 'react';

import MUIIconButton from '@mui/material/IconButton';

type Props = {
  size?: 'small' | 'medium' | 'large' | undefined;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  color?: 'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined;
  component?: ElementType;
  href?: string;
};

export function IconButton({ size, children, color, onClick, type, disabled, component = 'button', href }: Props) {
  return (
    <MUIIconButton
      size={size}
      disabled={disabled}
      color={color}
      onClick={onClick}
      type={type}
      component={component}
      href={href}
    >
      {children}
    </MUIIconButton>
  );
}
