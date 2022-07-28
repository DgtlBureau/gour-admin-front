import React from 'react';
import ReactSelect, { Colors, OnChangeValue } from 'react-select';
import { SxProps } from '@mui/material';

import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';
import { defaultTheme } from '../../../themes';

const font = defaultTheme.typography.fontFamily;

const selectColors: Pick<Colors, 'primary' | 'primary25'| 'primary50'> = {
  primary: defaultTheme.palette.primary.main,
  primary25: defaultTheme.palette.secondary.main,
  primary50: 'none',
};

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
  sx,
  ...props
}: Props<V, isMulti>) {
  const selectValue = value ?
    {
      value,
      label: options.find(it => it.value === value)?.label,
    } :
    null;

  return (
    <Box sx={sx}>
      {
        label && (
          <Typography variant="body2" color="primary">
            {label}
          </Typography>
        )
      }
      <ReactSelect
        value={selectValue}
        options={options}
        isMulti={isMulti}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            ...selectColors,
          },
        })}
        styles={{
          control: base => ({
            ...base,
            fontFamily: font,
            backgroundColor: 'inherit',
          }),
          menu: base => ({
            ...base,
            fontFamily: font,
            color: defaultTheme.palette.text.primary,
          }),
        }}
        {...props}
      />
      {
        error && isError && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )
      }
    </Box>
  );
}
