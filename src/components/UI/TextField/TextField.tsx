import React, { ChangeEventHandler, FocusEventHandler } from 'react';
import MUITextField from '@mui/material/TextField';
import { SxProps } from '@mui/material';

type Props = {
  value?: unknown;
  id?: string;
  label?: string;
  sx?: SxProps;
  name?: string;
  multiline?: boolean;
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
  isError?: boolean;
  type?: string;
  helperText?: string;
  rows?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function TextField({
  value,
  id,
  sx,
  label,
  variant,
  type = 'text',
  multiline,
  isError,
  helperText,
  name,
  onChange,
  onFocus,
  onBlur,
  ...props
}: Props) {
  return (
    <MUITextField
      fullWidth
      sx={sx}
      label={label}
      value={value}
      error={isError}
      id={id}
      multiline={multiline}
      variant={variant}
      name={name}
      type={type}
      helperText={helperText}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    />
  );
}
