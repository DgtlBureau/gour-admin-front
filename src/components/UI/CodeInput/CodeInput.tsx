import { SxProps } from '@mui/material';
import React from 'react';

type Props = {
  sx?: SxProps;
  value: string;
  onChange: (value: string) => void;
};

export function CodeInput({ sx, value, onChange }: Props) {
  return <div>CodeInput</div>;
}
