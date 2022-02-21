import React, { CSSProperties } from 'react';

type Props = {
  sx?: CSSProperties;
  value?: string;
  fieldsCount?: number;
  onChange: (value: string) => void;
};

export function CodeInput({
  sx, value, onChange, fieldsCount = 4,
}: Props) {
  return <div>CodeInput</div>;
}
