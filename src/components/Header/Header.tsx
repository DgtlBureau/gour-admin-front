import React, { ReactNode } from 'react';

import { AppBar as MUIAppBar, Toolbar, Typography } from '@mui/material';

const sx = {
  bar: {
    background: 'none',
    boxShadow: 'none',
  },
  wrapper: {
    padding: {
      sm: 0,
    },
  },
};

type Props = {
  leftTitle: string;
  rightContent?: ReactNode;
};

export function Header({ leftTitle, rightContent }: Props) {
  return (
    <MUIAppBar sx={sx.bar} position='static'>
      <Toolbar sx={sx.wrapper}>
        <Typography variant='h5' color='primary' component='div' sx={{ flexGrow: 1 }}>
          {leftTitle}
        </Typography>
        {rightContent}
      </Toolbar>
    </MUIAppBar>
  );
}
