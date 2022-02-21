import React, { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react';
import MUIInput from '@mui/material/Input';
import MUIFormControl from '@mui/material/FormControl';
import MUIInputLabel from '@mui/material/InputLabel';

type Props = {
  value: unknown;
  id: string;
  label?: string;
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
  type: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
};

export function Input({
  value, id, onChange, onFocus, label, variant, type,
}: Props) {
  return (
    <MUIFormControl variant={variant}>
      {label && <MUIInputLabel htmlFor={id}>{label}</MUIInputLabel>}
      <MUIInput value={value} id={id} onChange={onChange} onFocus={onFocus} type={type} />
    </MUIFormControl>
  );
}
