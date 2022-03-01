import React from 'react';
import {
  Card as MUICard,
  CardContent,
  CardActions,
  CardMedia,
} from '@mui/material';
import classNames from 'classnames';

import { Button } from '../UI/Button/Button';
import plusIcon from '../../assets/icons/cart/plus.svg';
import minusIcon from '../../assets/icons/cart/minus.svg';

import s from './Card.module.scss';

type Props = {
  title: string;
  price: number;
  amount: number;
  productImg: string;
  discount?: number;
  onElect: () => void;
  onDelete: () => void;
  onEdit: (action: 'increase' | 'decrease') => void;
}

export function Card({
  title,
  price,
  amount,
  productImg,
  discount,
  onElect,
  onDelete,
  onEdit,
}: Props) {
  return (
    <MUICard className={s.card}>
      <CardMedia
        className={s.image}
        component="img"
        image={productImg}
      />

      <div className={s.info}>
        <CardContent className={s.content}>
          <span className={s.title}>
            {title}
          </span>

          <div className={s.price__wrapper}>
            <span className={classNames(s.price, discount && s.discounted)}>
              {`${(discount ? Math.round(price * (1 - discount)) : price)} ₽`}
            </span>
            {
              discount && <span className={s.price__old}>{`${price} ₽`}</span>
            }
          </div>
        </CardContent>

        <CardActions className={s.actions}>
          <div className={s.actions__left}>
            <Button variant="text" onCLick={onElect}>
              В избранное
            </Button>
            <Button variant="text" onCLick={onDelete}>
              Удалить
            </Button>
          </div>

          <div className={s.edit}>
            <Button onCLick={() => onEdit('decrease')}>
              <img src={minusIcon} alt="" />
            </Button>

            <span className={s.edit__text}>{`${amount} г`}</span>

            <Button onCLick={() => onEdit('increase')}>
              <img src={plusIcon} alt="" />
            </Button>
          </div>
        </CardActions>
      </div>
    </MUICard>
  );
}
