import React from 'react';
import ReactQuill from 'react-quill';

type Props = {
  id?: string;
  value?: string;
  label?: string;
  isError?: boolean;
  helperText?: boolean;
  onChange?: (value: string) => void;
};

export function TextEditor({ id, value, label, isError, helperText, onChange }: Props) {
  return (
    <>
      {label}
      <ReactQuill id={id} value={value} onChange={onChange} />
      {helperText}
    </>
  );
}
