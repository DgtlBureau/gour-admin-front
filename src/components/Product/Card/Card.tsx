import React from 'react';
import classNames from 'classnames';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from '@mui/material';

import HeartIcon from '@mui/icons-material/Favorite';

import { Weight } from '../../../@types/entities/Product';
import { ProductCardRate as Rate } from './CardRate';
import { ProductCardDocket as Docket } from './CardDocket';
import { ProductCardCart as Cart } from './CardCart';

import s from './Card.module.scss';

export type ProductCardProps = {
  title: string;
  description: string;
  rating: number;
  weights: Weight[];
  weightId?: number;
  price: number;
  discount?: number;
  cost: string;
  previewSrc: string;
  countrySrc?: string;
  inCart: boolean;
  isElected: boolean;
  onAdd: () => void;
  onRemove: () => void;
  onEdit: (id: number) => void;
  onElect: () => void;
  onDetail: () => void;
};

export function ProductCard({
  title,
  description,
  rating,
  weightId = 0,
  weights,
  discount = 0,
  price,
  cost,
  previewSrc,
  countrySrc,
  inCart,
  isElected,
  onAdd,
  onRemove,
  onEdit,
  onElect,
  onDetail,
}: ProductCardProps) {
  const currentWeight = weights[weightId];

  const increaseWeight = () => onEdit(weightId + 1);
  const decreaseWeight = weightId === 0 ? onRemove : () => onEdit(weightId - 1);

  return (
    <Card className={s.card}>
      <CardContent className={s.content}>
        <div className={s.preview_n_heart}>
          <HeartIcon
            className={classNames(s.heart, isElected && s.elected)}
            onClick={onElect}
          />

          <CardMedia
            className={s.preview}
            component="img"
            image={previewSrc}
            alt=""
            onClick={onDetail}
          />

          {countrySrc && <img src={countrySrc} className={s.country} alt="" />}
        </div>

        <Rate rating={rating} cost={cost} />

        <div className={s.info}>
          <span
            role="button"
            tabIndex={0}
            onKeyPress={undefined}
            className={s.title}
            onClick={onDetail}
          >
            {title}
          </span>

          <span className={s.description}>{description}</span>
        </div>
      </CardContent>

      <CardActions className={classNames(s.actions, inCart && s.deployed)}>
        <Docket
          inCart={inCart}
          currentWeight={currentWeight}
          weights={weights}
          weightId={weightId}
          price={price}
          discount={discount}
          onEdit={onEdit}
        />

        <Cart
          inCart={inCart}
          currentWeight={currentWeight}
          weights={weights}
          weightId={weightId}
          onAdd={onAdd}
          increaseWeight={increaseWeight}
          decreaseWeight={decreaseWeight}
        />
      </CardActions>
    </Card>
  );
}
