import React, { ChangeEvent, CSSProperties, useEffect, useState } from 'react';
import { PhotoCamera } from '@mui/icons-material';
import { Stack, SxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';

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

const Input = styled('input')({
  display: 'none',
});

type Props = {
  id: string;
  name?: string;
  label?: string;
  value: File | null;
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
    const fr = new FileReader();
    fr.readAsDataURL(value);

    fr.addEventListener('load', () => {
      setImage(fr.result as string);
    });
  }, [value]);

  return (
    <Stack sx={{ width: '340px', ...sx }} alignItems="center" spacing={2}>
      <Stack
        sx={{ width: '100%' }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography variant="body1">{label}</Typography>
        {value && (
          <Button onClick={onDelete} size="small">
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
        <Input
          accept={allowedFileTypes.join(',')}
          onChange={onChange}
          id={id}
          type="file"
          name={name}
        />
        {!value && <PhotoCamera />}
      </label>
      {helperText && (
        <Typography variant="body1" color="error">
          {helperText}
        </Typography>
      )}
    </Stack>
  );
}
