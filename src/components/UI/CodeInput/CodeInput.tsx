import React, { CSSProperties } from 'react';
import ReactCodeInput, { InputModeTypes } from 'react-code-input';

type Props = {
  name: string;
  sx?: CSSProperties;
  value?: string;
  fieldsCount?: number;
  type?: 'number' | 'text' | 'password' | 'tel' | undefined;
  inputMode?: InputModeTypes;
  onChange: (value: string) => void;
};

export function CodeInput({
  name,
  sx,
  value,
  onChange,
  fieldsCount = 4,
  type = 'text',
  inputMode = 'numeric',
}: Props) {
  return (
    <ReactCodeInput
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      fields={fieldsCount}
      inputMode={inputMode}
    />
  );
}
