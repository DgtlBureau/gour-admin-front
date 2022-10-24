import React, { CSSProperties, ChangeEvent, useEffect, useState } from 'react';

import { PhotoCamera } from '@mui/icons-material';

import { Stack, SxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';

const Input = styled('input')({
  display: 'none',
});

const labelStyles: CSSProperties = {
  width: '100%',
  height: '220px',
  backgroundColor: '#BDBDBD',
  backgroundSize: 'cover',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundPosition: 'center',
};

type Props = {
  id: string;
  name?: string;
  label?: string;
  value: File | string | null;
  isError?: boolean;
  helperText?: string;
  allowedFileTypes?: ('image/jpeg' | 'image/png' | 'image/webp')[];
  sx?: SxProps;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
};

export function UploadImage({
  id,
  name,
  isError,
  helperText,
  label,
  value,
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp'],
  sx,
  onChange,
  onDelete,
}: Props) {
  const [image, setImage] = useState<string | null>('');

  useEffect(() => {
    if (!value) {
      setImage(null);
      return;
    }

    if (typeof value === 'string') {
      setImage(value);
      return;
    }

    const fr = new FileReader();
    fr.readAsDataURL(value);

    fr.addEventListener('load', () => {
      setImage(fr.result as string);
    });
  }, [value]);

  return (
    <Stack sx={{ width: '100%', ...sx }} alignItems='center' spacing={2}>
      <Stack
        sx={{ width: '100%', height: '35px' }}
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        spacing={2}
      >
        <Typography variant='body1'>{label}</Typography>
        {value && (
          <Button variant='text' onClick={onDelete} size='small'>
            Удалить
          </Button>
        )}
      </Stack>

      <label
        htmlFor={id}
        style={{
          ...labelStyles,
          backgroundImage: image ? `url(${image})` : 'none',
          border: isError ? '1px solid red' : 'none',
        }}
      >
        <Input accept={allowedFileTypes.join(',')} onChange={onChange} id={id} type='file' name={name} />
        {!value && <PhotoCamera />}
      </label>
      {helperText && (
        <Typography variant='body1' color='error'>
          {helperText}
        </Typography>
      )}
    </Stack>
  );
}
