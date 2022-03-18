import React, { ReactNode } from 'react';
import { Link as MUILink } from '@mui/material';

type Props = {
  children: ReactNode;
  path: string;
  className?: string;
}

export function Link({ children, path, className }: Props) {
  return (
    <MUILink href={path || '#'} className={className}>{children}</MUILink>
  );
}
