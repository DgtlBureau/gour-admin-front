import React from 'react';
import { SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { UploadImage } from '../UI/UploadImage/UploadImage';

type Props = {
  name: string;
  defaultValue?: string | File;
  label?: string;
  type?: string;
  sx?: SxProps;
  id: string;
  allowedFileTypes?: ('image/jpeg' | 'image/png' | 'image/webp')[];
  onDelete: () => void;
};

export function HFUploadPhoto({
  name,
  defaultValue,
  onDelete,
  allowedFileTypes,
  ...props
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { ref, ...rest } }) => (
        <UploadImage
          {...rest}
          isError={!!errors[name]}
          helperText={errors[name]?.message ?? ''}
          allowedFileTypes={allowedFileTypes}
          onDelete={onDelete}
          {...props}
        />
      )}
    />
  );
}
