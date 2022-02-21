import React from 'react';
import MUICheckbox from '@mui/material/Checkbox';
import MUIFormControlLabel from '@mui/material/FormControlLabel';

type Props = {
  defaultChecked?: boolean;
  disabled?: boolean;
  checked?: boolean;
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Checkbox({
  defaultChecked, checked, disabled, onChange, label,
}: Props) {
  if (label) {
    return (
      <MUIFormControlLabel
        label={label}
        control={(
          <MUICheckbox
            defaultChecked={defaultChecked}
            disabled={disabled}
            checked={checked}
            onChange={onChange}
          />
        )}
      />
    );
  }
  return (
    <MUICheckbox
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={onChange}
    />
  );
}
