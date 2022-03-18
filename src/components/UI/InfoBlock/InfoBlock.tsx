import React from 'react';
import { Card, CardContent } from '@mui/material';

import { Link as CustomLink } from '../Link/Link';

import s from './InfoBlock.module.scss';

type Props = {
  text: string;
  link?: {
    label: string;
    path: string;
  };
}

export function InfoBlock({ text, link }: Props) {
  return (
    <Card className={s.card}>
      <CardContent className={s.content}>
        <div className={s.text}>{text}</div>
        {link && <CustomLink path={link.path}>{link.label}</CustomLink>}
      </CardContent>
    </Card>
  );
}
