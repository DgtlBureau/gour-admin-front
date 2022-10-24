import React from 'react';

import MUICheckbox from '@mui/material/Checkbox';
import MUIFormControlLabel from '@mui/material/FormControlLabel';
import { SxProps } from '@mui/material/styles';

type Props = {
  defaultChecked?: boolean;
  disabled?: boolean;
  checked?: boolean;
  label?: string;
  sx?: SxProps;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Checkbox({ defaultChecked, checked, disabled, label, sx, onChange }: Props) {
  if (label) {
    return (
      <MUIFormControlLabel
        sx={sx}
        label={label}
        control={
          <MUICheckbox defaultChecked={defaultChecked} disabled={disabled} checked={checked} onChange={onChange} />
        }
      />
    );
  }
  return <MUICheckbox sx={sx} defaultChecked={defaultChecked} disabled={disabled} onChange={onChange} />;
}
