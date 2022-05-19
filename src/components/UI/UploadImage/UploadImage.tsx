import React, {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  useEffect,
  useState,
} from 'react';
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
  value?: File;
  label?: string;
  isError?: boolean;
  helperText?: string;
  allowedFileTypes?: ('image/jpeg' | 'image/png' | 'image/webp')[];
  sx?: SxProps;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export function UploadImage({
  id,
  name,
  isError,
  helperText,
  value,
  label,
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp'],
  sx,
  onChange,
}: Props) {
  const [loadedFile, setLoadedFile] = useState<string | ArrayBuffer | null>(null);
  const [fileEvent, setFileEvent] = useState<ChangeEvent<HTMLInputElement> | null>(null);

  const putImage = (image: File) => {
    const fr = new FileReader();

    fr.addEventListener('load', () => {
      setLoadedFile(fr.result);
    });

    fr.readAsDataURL(image);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileEvent(event);

    onChange(event);

    const { files } = event.target;

    if (!files) return;

    putImage(files[0]);
  };

  const handleDelete = () => {
    setLoadedFile(null);

    if (!fileEvent) return;

    fileEvent.target.value = '';
    onChange(fileEvent);
  };

  useEffect(() => value && putImage(value), []);

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
        <Button onClick={handleDelete} size="small" variant="text">
          Удалить
        </Button>
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
          id={id}
          type="file"
          name={name}
          onChange={handleChange}
        />
        {!loadedFile && <PhotoCamera />}
      </label>
      {helperText && (
        <Typography variant="body1" color="error">
          {helperText}
        </Typography>
      )}
    </Stack>
  );
}
