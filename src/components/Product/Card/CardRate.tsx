import React from 'react';

import starIcon from '../../../assets/icons/stars/gray-star.svg';

import s from './Card.module.scss';

type Props = {
  rating: number;
  cost: string;
}

export function ProductCardRate({ rating, cost }: Props) {
  return (
    <div className={s.rating_n_cost}>
      <div className={s.rating}>
        <img src={starIcon} alt="" />
        <span>{rating}</span>
      </div>

      <span>{cost}</span>
    </div>
  );
}
