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
  multiline,
  isError,
  helperText,
  name,
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
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      onFocus={onFocus}
      type={type}
      helperText={helperText}
      {...props}
    />
  );
}
