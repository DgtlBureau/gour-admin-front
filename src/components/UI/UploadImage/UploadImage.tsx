import React, {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  CSSProperties,
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
  value?: string;
  label?: string;
  isError?: boolean;
  helperText?: string;
  allowedFileTypes?: ('image/jpeg' | 'image/png' | 'image/webp')[];
  sx?: SxProps;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
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
  onFocus,
  onBlur,
}: Props) {
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

    if (!fileEvent) return;

    fileEvent.target.value = '';
    onChange(fileEvent);
  };

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
          // eslint-disable-next-line
          backgroundImage:  loadedFile ? `url(${loadedFile})` : `url(${value})`,
          border: isError ? '1px solid red' : 'none',
        }}
      >
        <Input
          accept={allowedFileTypes.join(',')}
          id={id}
          type="file"
          name={name}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {(!loadedFile && !value) && <PhotoCamera />}
      </label>
      {
        helperText && (
          <Typography variant="body1" color="error">
            {helperText}
          </Typography>
        )
      }
    </Stack>
  );
}
