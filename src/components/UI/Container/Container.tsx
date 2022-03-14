import React, { CSSProperties, ReactNode } from 'react';

type Props = {
  sx?: CSSProperties;
  children: ReactNode;
};

export function Container({ sx, children }: Props) {
  return <div style={sx}>{children}</div>;
}
