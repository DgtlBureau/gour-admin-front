import React from 'react';
import { Card, CardContent } from '@mui/material';

import { Typography } from '../Typography/Typography';
import { Link as CustomLink } from '../Link/Link';

const sx = {
  card: {
    maxWidth: '380px',
    boxShadow: 'none',
    border: '1px solid #EBEBEB',
  },
  content: {
    '&:last-child': {
      paddingBottom: '16px',
    },
  },
};

type Props = {
  text: string;
  link?: {
    label: string;
    path: string;
  };
}

export function InfoBlock({ text, link }: Props) {
  return (
    <Card sx={sx.card}>
      <CardContent sx={sx.content}>
        <Typography variant="body2">{text}</Typography>
        {link && <CustomLink path={link.path}>{link.label}</CustomLink>}
      </CardContent>
    </Card>
  );
}
