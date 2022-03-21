import React, { ChangeEventHandler, CSSProperties, FocusEventHandler } from 'react';
import MUITextareaAutosize from '@mui/material/TextareaAutosize';

const textareaSx: CSSProperties = {
  font: 'inherit',
  border: '1px solid #C4c4c4',
  background: 'none',
  margin: '10px 0 0 0',
  display: 'block',
  minWidth: 0,
  width: '100%',
  height: '130px',
  padding: '16.5px 14px',
  borderRadius: '4px',
  color: 'rgba(0, 0, 0, 0.87)',
  overflow: 'auto',
  resize: 'none',
  boxSizing: 'border-box',
};

type Props = {
  maxRows?: number;
  minRows?: number;
  sx?: CSSProperties;
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder?: string;
  isError?: boolean;
  error?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
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
  isError,
  error,
}: Props) {
  return (
    <MUITextareaAutosize
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      maxRows={maxRows}
      minRows={minRows}
      style={{
        ...textareaSx,
        ...sx,
      }}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
}
