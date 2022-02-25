import React, { ChangeEventHandler, FocusEventHandler } from 'react';
import MUIInput from '@mui/material/Input';
import MUIFormControl from '@mui/material/FormControl';
import MUIInputLabel from '@mui/material/InputLabel';

type Props = {
  value: unknown;
  id?: string;
  label?: string;
  type: string;
  name: string;
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
  className?: string;
  isError?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function Input({
  value,
  id,
  label,
  variant,
  type,
  name,
  className,
  isError,
  onChange,
  onFocus,
  onBlur,
}: Props) {
  return (
    <MUIFormControl className={className} variant={variant} error={isError}>
      {label && id && <MUIInputLabel htmlFor={id}>{label}</MUIInputLabel>}
      <MUIInput
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </MUIFormControl>
  );
}
