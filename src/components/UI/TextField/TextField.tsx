import React, { ChangeEventHandler, FocusEventHandler } from 'react';
import MUITextField from '@mui/material/TextField';
import { SxProps } from '@mui/material';

type Props = {
  value?: unknown;
  id?: string;
  label?: string;
  sx?: SxProps;
  name?: string;
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
  isError?: boolean;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  helperText?: string;
};

export function TextField({
  value,
  id,
  sx,
  onChange,
  onFocus,
  onBlur,
  label,
  variant,
  type = 'text',
  isError,
  helperText,
  name,
}: Props) {
  return (
    <MUITextField
      fullWidth
      sx={sx}
      label={label}
      value={value}
      error={isError}
      id={id}
      variant={variant}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      onFocus={onFocus}
      type={type}
      helperText={helperText}
    />
  );
}
