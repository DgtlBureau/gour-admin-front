import React, { ReactNode } from 'react';

import { Button } from '../../UI/Button/Button';

import s from './Empty.module.scss';

const btnSx = {
  marginTop: '16px',
  backgroundColor: '#25262D',
  '&:hover': {
    opacity: 0.75,
    backgroundColor: '#25262D',
  },
};

type Props = {
  title: string;
  children: ReactNode;
  btn?: {
    label: string;
    onClick: () => void;
  };
};

export function CartEmpty({ title, children, btn }: Props) {
  return (
    <div className={s.notice}>
      <span className={s.title}>{title}</span>
      <div className={s.description}>{children}</div>
      {btn && (
        <Button sx={btnSx} onClick={btn.onClick}>
          {btn.label}
        </Button>
      )}
    </div>
  );
}
