import React from 'react';

import { Card, CardContent, Rating } from '@mui/material';

import lightStarIcon from '../../../assets/icons/comment/stars/light-star.svg';
import blueStarIcon from '../../../assets/icons/comment/stars/blue-star.svg';

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
          <Rating
            className={s.stars}
            value={grade}
            precision={0.5}
            size="small"
            readOnly
            icon={<img src={blueStarIcon} alt="" />}
            emptyIcon={<img src={lightStarIcon} alt="" />}
          />
          <span className={s.date}>{date}</span>
        </div>

        <span className={s.text}>{text}</span>
      </CardContent>
    </Card>
  );
}
