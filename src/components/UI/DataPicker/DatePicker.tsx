import React from 'react';

import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';

import { SxProps, TextField, TextFieldProps } from '@mui/material';

type Props = {
  value?: string;
  label?: string;
  locale?: Locale;
  sx?: SxProps;
  isError?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  onChange: () => void;
};

export function DatePicker({
  value,
  label,
  onChange,
  locale = ruLocale,
  isError,
  helperText,
  ...inputProps
}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      <MUIDatePicker
        mask="__.__.____"
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params: TextFieldProps) => (
          <TextField
            {...params}
            {...inputProps}
            error={isError}
            helperText={helperText}
          />
        )}
      />
    </LocalizationProvider>
  );
}
