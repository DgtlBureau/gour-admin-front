import React, { ReactNode } from 'react';

import { Link as MUILink, SxProps } from '@mui/material';

type Props = {
  children: ReactNode;
  href?: string;
  underline?: 'none' | 'hover' | 'always';
  className?: string;
  sx?: SxProps;
};

export function Link(props: Props) {
  const { children, href, underline = 'always', className, sx } = props;

  return (
    <MUILink href={href || '#'} underline={underline} className={className} sx={sx}>
      {children}
    </MUILink>
  );
}
