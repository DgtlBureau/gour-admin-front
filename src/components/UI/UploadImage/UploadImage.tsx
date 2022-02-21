import React, { ChangeEventHandler } from 'react';
import { PhotoCamera } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconButton } from '../IconButton/IconButton';

type Props = {
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  allowedFileTypes: ('image/jpeg' | 'image/png' | 'image/webp')[];
};

export function UploadImage({ id, onChange, allowedFileTypes }: Props) {
  const Input = styled('input')({
    display: 'none',
  });

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor={id}>
        <Input
          accept={allowedFileTypes.join(',')}
          onChange={onChange}
          id={id}
          type="file"
        />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </Stack>
  );
}
