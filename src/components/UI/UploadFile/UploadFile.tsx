import React, { ChangeEventHandler } from 'react';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button } from '../Button/Button';

type Props = {
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  allowedFileTypes: 'application/pdf'[];
};

export function UploadFile({ id, allowedFileTypes, onChange }: Props) {
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
          multiple
          type="file"
        />
        <Button variant="contained" component="span">
          Загрузить
        </Button>
      </label>
    </Stack>
  );
}
