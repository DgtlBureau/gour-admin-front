import React from 'react';
import classNames from 'classnames';
import { Rating } from '@mui/material';

import { getDeclensionWordByCount } from '../../../utils/wordHelper';

import lightStarIcon from '../../../assets/icons/comment/stars/light-star.svg';
import grayStarIcon from '../../../assets/icons/comment/stars/gray-star.svg';
import commentIcon from '../../../assets/icons/comment/comment.svg';

import s from './Information.module.scss';

export type ProductInformationProps = {
  rating: number;
  gradesCount: number;
  commentsCount: number;
  characteristics: {
    label: string;
    value: string;
  }[];
  onClickComments(): void;
};

export function ProductInformation({
  rating,
  gradesCount,
  commentsCount,
  characteristics,
  onClickComments,
}: ProductInformationProps) {
  const gradesCountText = getDeclensionWordByCount(gradesCount, [
    'оценок',
    'оценка',
    'оценки',
  ]);
  const commentsCountText = getDeclensionWordByCount(commentsCount, [
    'отзывов',
    'отзыв',
    'отзыва',
  ]);

  return (
    <div className={s.info}>
      <div className={s.stats}>
        <div className={s.stat}>
          <Rating
            value={rating}
            precision={0.5}
            size="small"
            readOnly
            icon={<img src={grayStarIcon} alt="" />}
            emptyIcon={<img src={lightStarIcon} alt="" />}
          />
          <span className={s.count}>{`${gradesCount} ${gradesCountText}`}</span>
        </div>

        <div
          role="button"
          className={classNames(s.stat, s.comments)}
          onClick={onClickComments}
          onKeyPress={undefined}
          tabIndex={0}
        >
          <img src={commentIcon} alt="" />
          <span className={s.count}>{`${commentsCount} ${commentsCountText}`}</span>
        </div>
      </div>

      {characteristics.map(characteristic => (
        <div key={characteristic.label} className={s.characteristic}>
          <span>{characteristic.label}</span>
          <div className={s.divider} />
          <span className={s.value}>{characteristic.value}</span>
        </div>
      ))}
    </div>
  );
}
