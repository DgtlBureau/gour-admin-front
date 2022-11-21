import React from 'react';
import ReactQuill from 'react-quill';

import { SxProps } from '@mui/material';

import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';
import editorSx from './TextEditor.styles';

type Props = {
  id?: string;
  value?: string;
  label?: string;
  isError?: boolean;
  helperText?: boolean;
  sx?: SxProps;
  onChange?: (value: string) => void;
};

export function TextEditor({ id, value, label, isError, helperText, sx, onChange }: Props) {
  return (
    <Box sx={sx}>
      <Typography sx={editorSx.label}>{label}</Typography>

      <ReactQuill id={id} value={value} onChange={onChange} />

      <Typography variant='caption' color={isError ? 'error' : undefined} sx={editorSx.helperText}>
        {helperText}
      </Typography>
    </Box>
  );
}
