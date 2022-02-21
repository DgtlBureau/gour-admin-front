import React, { ChangeEventHandler, CSSProperties, FocusEventHandler } from 'react';
import { Textarea } from '../Textarea/Textarea';

type Props = {
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
  style?: CSSProperties;
  defaultValue?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
};

export function CommentTextarea({
  minRows,
  maxRows,
  placeholder,
  style,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
}: Props) {
  return (
    <Textarea
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      minRows={minRows}
      maxRows={maxRows}
      defaultValue={defaultValue}
      placeholder={placeholder}
      sx={style}
    />
  );
}
