import React from 'react';
import classNames from 'classnames';
import { Rating } from '@mui/material';

import { getWordCounterText } from '../../../helpers/wordHelper';

import lightStarIcon from '../../../assets/icons/comment/stars/light-star.svg';
import grayStarIcon from '../../../assets/icons/comment/stars/gray-star.svg';
import commentIcon from '../../../assets/icons/comment/comment.svg';

import s from './ProductInformation.module.scss';

export type ProductInformationProps = {
  rating: number;
  gradesCount: number;
  commentsCount: number;
  characteristics: Record<string, string>;
  onClickComments(): void;
};

export function ProductInformation({
  rating,
  gradesCount,
  commentsCount,
  characteristics,
  onClickComments,
}: ProductInformationProps) {
  const gradesCountText = getWordCounterText(gradesCount, ['оценок', 'оценка', 'оценки']);
  const commentsCountText = getWordCounterText(commentsCount, ['отзывов', 'отзыв', 'отзыва']);

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

      {
        Object.keys(characteristics).map(key => (
          <div className={s.characteristic}>
            <span>{key}</span>
            <div className={s.divider} />
            <span className={s.value}>{characteristics[key]}</span>
          </div>
        ))
      }
    </div>
  );
}
