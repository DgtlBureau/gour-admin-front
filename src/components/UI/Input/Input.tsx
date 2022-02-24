import React, { ChangeEventHandler, FocusEventHandler } from 'react';
import MUIInput from '@mui/material/Input';
import MUIFormControl from '@mui/material/FormControl';
import MUIInputLabel from '@mui/material/InputLabel';

type Props = {
  value: unknown;
  id?: string;
  label?: string;
  name: string;
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
  type: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
};

export function Input({
  value,
  id,
  onChange,
  onFocus,
  label,
  variant,
  type,
  name,
}: Props) {
  return (
    <MUIFormControl variant={variant}>
      {label && id && <MUIInputLabel htmlFor={id}>{label}</MUIInputLabel>}
      <MUIInput
        value={value}
        id={id}
        onChange={onChange}
        name={name}
        onFocus={onFocus}
        type={type}
      />
    </MUIFormControl>
  );
}
