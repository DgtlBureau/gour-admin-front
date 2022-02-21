import React, { ElementType, ReactNode } from 'react';
import MUIAppBar from '@mui/material/AppBar';

type Props = {
  leftTitle: string;
  rightContent: ReactNode;
};

export function Header({ leftTitle, rightContent }: Props) {
  return <>Header</>;
}
