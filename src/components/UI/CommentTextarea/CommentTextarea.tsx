import React, { ChangeEventHandler, CSSProperties, FocusEventHandler } from 'react';
import { Button } from '../Button/Button';
import { Textarea } from '../Textarea/Textarea';

import s from './CommentTextarea.module.scss';

type Props = {
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
  buttonVariant?: 'text' | 'outlined' | 'contained';
  style?: CSSProperties;
  defaultValue?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onClick?(): void;
};

export function CommentTextarea({
  minRows,
  maxRows,
  placeholder,
  style,
  defaultValue,
  buttonVariant,
  onClick,
  onChange,
  onBlur,
  onFocus,
}: Props) {
  return (
    <div className={s.commentTextarea}>
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
      <Button onCLick={onClick} variant={buttonVariant}>
        Отправить
      </Button>
    </div>
  );
}
