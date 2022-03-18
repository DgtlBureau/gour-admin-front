import React, { ReactNode } from 'react';
import { Toolbar, Typography, AppBar as MUIAppBar } from '@mui/material';

import s from './Header.module.scss';

type Props = {
  leftTitle: string;
  rightContent?: ReactNode;
};

export function Header({ leftTitle, rightContent }: Props) {
  return (
    <MUIAppBar className={s.bar} position="static">
      <Toolbar className={s.wrapper}>
        <Typography variant="h5" color="black" component="div" sx={{ flexGrow: 1 }}>
          {leftTitle}
        </Typography>
        {rightContent}
      </Toolbar>
    </MUIAppBar>
  );
}
