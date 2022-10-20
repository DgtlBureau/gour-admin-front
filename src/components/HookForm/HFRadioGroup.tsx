import React, { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { RadioGroup, SxProps } from '@mui/material';

type Props = {
  name: string;
  defaultValue?: string;
  children: ReactNode;
  sx?: SxProps;
};

export function HFRadioGroup({ name, defaultValue, children, sx }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || false}
      render={({ field: { ref, ...rest } }) => (
        <RadioGroup {...rest} row name={name} sx={sx}>
          {children}
        </RadioGroup>
      )}
    />
  );
}
