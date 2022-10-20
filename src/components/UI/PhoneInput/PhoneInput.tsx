import React, { CSSProperties, ChangeEventHandler, FocusEventHandler } from 'react';
import InputMask from 'react-input-mask';

import { TextField } from '@mui/material';

type Props = {
  placeholder?: string;
  style?: CSSProperties;
  defaultValue?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  value: string;
};

export function PhoneInput({ placeholder, style, defaultValue, onChange, onBlur, onFocus, value }: Props) {
  return (
    <InputMask
      style={style}
      placeholder={placeholder}
      value={value || defaultValue}
      mask='+7 (999) 999 99 99'
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      <TextField />
    </InputMask>
  );
}
