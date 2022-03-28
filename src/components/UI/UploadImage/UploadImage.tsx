import React, { ChangeEvent, ChangeEventHandler, CSSProperties, useState } from 'react';
import { PhotoCamera } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconButton } from '../IconButton/IconButton';
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

type Props = {
  id: string;
  name?: string;
  label?: string;
  isError?: boolean;
  helperText?: string;
  allowedFileTypes: ('image/jpeg' | 'image/png' | 'image/webp')[];
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export function UploadImage({
  id,
  onChange,
  name,
  isError,
  helperText,
  label,
  allowedFileTypes,
}: Props) {
  const Input = styled('input')({
    display: 'none',
  });

  const [loadedFile, setLoadedFile] = useState<string | ArrayBuffer | null>(null);
  const [fileEvent, setFileEvent] = useState<ChangeEvent<HTMLInputElement> | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileEvent(event);
    onChange(event);
    const { files } = event.target;

    if (!files) return;

    const fr = new FileReader();

    fr.addEventListener('load', () => {
      setLoadedFile(fr.result);
    });

    fr.readAsDataURL(files[0]);
  };

  const handleDelete = () => {
    setLoadedFile(null);

    if (fileEvent) {
      fileEvent.target.value = '';
      onChange(fileEvent);
    }
  };

  return (
    <Stack sx={{ width: '340px' }} alignItems="center" spacing={2}>
      <Stack
        sx={{ width: '100%' }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography variant="body1">{label}</Typography>
        <Button onClick={handleDelete}>Удалить</Button>
      </Stack>
      <label
        htmlFor={id}
        style={{
          ...labelStyles,
          backgroundImage: loadedFile ? `url(${loadedFile})` : 'none',
          border: isError ? '1px solid red' : 'none',
        }}
      >
        <Input
          accept={allowedFileTypes.join(',')}
          onChange={handleChange}
          id={id}
          type="file"
          name={name}
        />
        {!loadedFile && (
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        )}
      </label>
      {helperText && (
        <Typography variant="body1" color="error">
          {helperText}
        </Typography>
      )}
    </Stack>
  );
}
