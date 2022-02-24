import React, { CSSProperties, ChangeEventHandler, FocusEventHandler } from 'react';
import MUITextField from '@mui/material/TextField';
import MUIFormControl from '@mui/material/FormControl';
import MUIInputLabel from '@mui/material/InputLabel';

type Props = {
  value: unknown;
  id?: string;
  label?: string;
  sx?: CSSProperties;
  name: string;
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
  error?: string;
  type: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
};

export function Input({
  value,
  id,
  sx,
  onChange,
  onFocus,
  label,
  variant,
  type,
  error,
  name,
}: Props) {
  return (
    <MUIFormControl variant={variant}>
      {label && id && <MUIInputLabel htmlFor={id}>{label}</MUIInputLabel>}
      <MUITextField
        sx={sx}
        value={value}
        error={!!error}
        id={id}
        onChange={onChange}
        name={name}
        onFocus={onFocus}
        type={type}
        helperText={error}
      />
    </MUIFormControl>
  );
}
