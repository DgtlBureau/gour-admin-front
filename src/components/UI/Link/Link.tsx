import React, { ReactNode } from 'react';
import { Link as MUILink } from '@mui/material';

type Props = {
  children: ReactNode;
  path: string;
  underline?: 'none' | 'hover' | 'always';
  className?: string;
}

export function Link(props: Props) {
  const { children, path, underline = 'always', className } = props;

  return (
    <MUILink href={path} underline={underline} className={className}>{children}</MUILink>
  );
}
