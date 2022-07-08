import React, {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
} from 'react';
import MUITextareaAutosize from '@mui/material/TextareaAutosize';

import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';
import { defaultTheme as t } from '../../../themes';

const textareaSx: CSSProperties = {
  overflow: 'auto',
  resize: 'none',
  boxSizing: 'border-box',
  display: 'block',
  height: '130px',
  minWidth: 0,
  width: '100%',
  padding: '16.5px 14px',
  border: '1px solid #C4c4c4',
  borderRadius: '4px',
  font: 'inherit',
  background: 'none',
  outlineColor: t.palette.primary.main,
  color: t.palette.text.primary,
};

const errorColor = t.palette.error.main;

const errorSx = {
  outlineColor: errorColor,
  borderColor: errorColor,
  color: errorColor,
};

const boxSx = {
  width: '100%',
};

type Props = {
  name?: string;
  label?: string;
  maxRows?: number;
  minRows?: number;
  sx?: CSSProperties;
  defaultValue?: string | number | readonly string[] | undefined;
  value?: string | number | readonly string[] | undefined;
  placeholder?: string;
  isError?: boolean;
  error?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
};

export function Textarea({
  label,
  minRows = 1,
  sx,
  isError,
  error,
  ...props
}: Props) {
  return (
    <Box sx={{ ...boxSx, ...(isError && errorSx) }}>
      {label && (
        <Typography variant="body2" color={(isError && 'error') || 'primary'}>
          {label}
        </Typography>
      )}
      <MUITextareaAutosize
        {...props}
        minRows={minRows}
        style={{ ...textareaSx, ...sx, ...(isError && errorSx) }}
      />
      {isError && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
}
