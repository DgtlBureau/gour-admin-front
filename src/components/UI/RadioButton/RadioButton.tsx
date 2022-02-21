import React, { ChangeEvent, CSSProperties, ReactNode } from 'react';
import MUIRadio from '@mui/material/Radio';

type Props = {
  checked?: boolean;
  size?: 'small' | 'medium' | undefined;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | undefined;
  defaultChecked?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  sx?: CSSProperties;
  checkedIcon?: ReactNode;
  icon?: ReactNode;
  id?: string;
  disabled?: boolean;
  disableRipple?: boolean;
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
  sx,
}: Props) {
  return (
    <MUIRadio
      checked={checked}
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
