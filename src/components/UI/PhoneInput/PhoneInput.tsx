import React, { ChangeEventHandler, CSSProperties, FocusEventHandler } from 'react';

type Props = {
  placeholder?: string;
  style?: CSSProperties;
  defaultValue?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  value: string;
};

export function PhoneInput({
  placeholder,
  style,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  value,
}: Props) {
  return <div>PhoneInput</div>; // use masked input + components/input
}
