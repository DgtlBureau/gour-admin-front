import React, {
  ChangeEvent, CSSProperties, InputHTMLAttributes, ReactNode,
} from 'react';
import MUISwitch from '@mui/material/Switch';

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
  disabled?: boolean;
  disableRipple?: boolean;
  sx?: CSSProperties;
  checkedIcon?: ReactNode;
  icon?: ReactNode;
  id?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement> | undefined;
};
export function Switch({
  checked,
  checkedIcon,
  icon,
  color,
  defaultChecked,
  disabled,
  disableRipple,
  id,
  onChange,
  size,
  sx,
  inputProps,
}: Props) {
  return (
    <MUISwitch
      checked={checked}
      checkedIcon={checkedIcon}
      defaultChecked={defaultChecked}
      icon={icon}
      color={color}
      disabled={disabled}
      disableRipple={disableRipple}
      id={id}
      onChange={onChange}
      size={size}
      sx={sx}
      inputProps={inputProps}
    />
  );
}