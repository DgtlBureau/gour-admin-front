import React, { ReactNode } from 'react';
import { Link as MUILink, SxProps } from '@mui/material';

type Props = {
  children: ReactNode;
  path?: string;
  underline?: 'none' | 'hover' | 'always';
  className?: string;
  sx?: SxProps;
}

export function Link(props: Props) {
  const { children, path, underline = 'always', className, sx } = props;

  return (
    <MUILink
      href={path || '#'}
      underline={underline}
      className={className}
      sx={sx}
    >
      {children}
    </MUILink>

  );
}
