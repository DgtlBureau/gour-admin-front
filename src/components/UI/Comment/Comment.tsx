import React from 'react';
import { Card, CardContent } from '@mui/material';

import blueStarIcon from '../../../assets/icons/comment/stars/blue-star.svg';
import grayStarIcon from '../../../assets/icons/comment/stars/gray-star.svg';

import s from './Comment.module.scss';

export type CommentProps = {
  title: string;
  grade: number;
  date: string;
  text: string;
};

export function Comment({
  title,
  grade,
  date,
  text,
}: CommentProps) {
  return (
    <Card className={s.card}>
      <CardContent className={s.content}>
        <span className={s.title}>{title}</span>

        <div className={s.grade_n_date}>
          {
            Array.from({ length: 5 }, (_, i) => (
              <img
                src={i < grade ? blueStarIcon : grayStarIcon}
                className={s.star}
                alt=""
              />
            ))
          }
          <span className={s.date}>{date}</span>
        </div>

        <span className={s.text}>{text}</span>
      </CardContent>
    </Card>
  );
}
