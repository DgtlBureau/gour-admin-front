import React, { ChangeEventHandler, CSSProperties, FocusEventHandler } from 'react';
import MUITextareaAutosize from '@mui/material/TextareaAutosize';

type Props = {
  maxRows?: number;
  minRows?: number;
  sx?: CSSProperties;
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder?: string | undefined;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
};

export function Textarea({
  maxRows,
  minRows = 1,
  sx,
  defaultValue,
  placeholder,
  onChange,
  onBlur,
  onFocus,
}: Props) {
  return (
    <MUITextareaAutosize
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      maxRows={maxRows}
      minRows={minRows}
      style={{ ...sx }}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
}
