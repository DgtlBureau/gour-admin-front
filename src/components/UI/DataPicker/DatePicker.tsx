import React from 'react';

import MUIDatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';

import { SxProps, TextField } from '@mui/material';

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
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
      <MUIDatePicker
        mask="__.__.____"
        label={label}
        value={value}
        onChange={onChange}
        renderInput={params => (
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
