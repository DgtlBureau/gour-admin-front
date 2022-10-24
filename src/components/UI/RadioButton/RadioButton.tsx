import React, { ChangeEvent, ReactNode } from 'react';

import { SxProps } from '@mui/material';
import MUIRadio from '@mui/material/Radio';

type Props = {
  checked?: boolean;
  size?: 'small' | 'medium' | undefined;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined;
  defaultChecked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  sx?: SxProps;
  checkedIcon?: ReactNode;
  icon?: ReactNode;
  id?: string;
  disabled?: boolean;
  disableRipple?: boolean;
  value?: string | boolean;
};

export function RadioButton({
  checked,
  checkedIcon,
  defaultChecked,
  disabled,
  disableRipple,
  icon,
  color,
  id,
  onChange,
  size,
  value,
  sx,
}: Props) {
  return (
    <MUIRadio
      checked={checked}
      value={value}
      checkedIcon={checkedIcon}
      defaultChecked={defaultChecked}
      disabled={disabled}
      disableRipple={disableRipple}
      icon={icon}
      color={color}
      id={id}
      size={size}
      sx={sx}
      onChange={onChange}
    />
  );
}
