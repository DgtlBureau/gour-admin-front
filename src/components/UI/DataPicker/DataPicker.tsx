import React from 'react';

import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';

import { SxProps, TextField, TextFieldProps } from '@mui/material';

type Props = {
  value?: string;
  label?: string;
  locale?: Locale;
  sx?: SxProps;
  fullWidth?: boolean;
  onChange: () => void;
};

export function DataPicker({
  value,
  label,
  onChange,
  locale = ruLocale,
  ...inputProps
}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
      <DatePicker
        mask="__.__.____"
        label={label}
        value={value}
        onChange={onChange}
        renderInput={params => <TextField {...params} {...inputProps} />}
      />
    </LocalizationProvider>
  );
}
