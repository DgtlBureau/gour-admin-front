import React from 'react';
import ReactSelect, { OnChangeValue } from 'react-select';
import { SxProps } from '@mui/material';

import { Typography } from '../Typography/Typography';

export type SelectOption<V = string> = {
  value: V;
  label: string | undefined;
};

type Props<V, isMulti extends boolean> = {
  onChange: (newValue: OnChangeValue<SelectOption<V>, isMulti>) => void;
  value?: V;
  isMulti?: isMulti;
  error?: string;
  isError?: boolean;
  options: SelectOption<V>[];
  isDisabled?: boolean;
  placeholder?: string;
  label?: string;
  sx?: SxProps;
};

export function Select<V, isMulti extends boolean>({
  value,
  options,
  error,
  isError,
  isMulti,
  label,
  ...props
}: Props<V, isMulti>) {
  const selectValue = value ?
    {
      value,
      label: options.find(it => it.value === value)?.label,
    } :
    null;

  return (
    <div style={{ marginTop: 15 }}>
      {label && <Typography variant="inherit">{label}</Typography>}
      <ReactSelect value={selectValue} options={options} isMulti={isMulti} {...props} />
      {error && isError && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </div>
  );
}
