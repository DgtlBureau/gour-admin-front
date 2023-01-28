import React, { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react';

import { TextField as MUITextField, SxProps } from '@mui/material';

import { onPhoneInput, onPhoneKeyDown, onPhonePaste } from './phoneValidator';

type Props = {
  value?: unknown;
  id?: string;
  label?: string;
  sx?: SxProps;
  name?: string;
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
  isError?: boolean;
  type?: string;
  disabled?: boolean;
  helperText?: string;
  endAdornment?: ReactNode;
  multiline?: boolean;
  rows?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function PhoneInput({
  value,
  id,
  sx,
  label,
  variant,
  type = 'text',
  isError,
  helperText,
  endAdornment,
  disabled,
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
      disabled={disabled}
      variant={variant}
      onChange={onChange}
      name={name}
      onFocus={onFocus}
      onBlur={onBlur}
      type={type}
      helperText={helperText}
      InputProps={{
        onInput: onPhoneInput,
        onKeyDown: onPhoneKeyDown,
        onPaste: onPhonePaste,
        endAdornment,
      }}
      {...props}
    />
  );
}
