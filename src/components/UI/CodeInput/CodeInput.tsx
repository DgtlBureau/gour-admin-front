import React, { CSSProperties } from 'react';

type Props = {
  sx?: CSSProperties;
  value: string;
  onChange: (value: string) => void;
};

export function CodeInput({ sx, value, onChange }: Props) {
  return <div>CodeInput</div>;
}
