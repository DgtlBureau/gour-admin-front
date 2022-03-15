import React from 'react';
import { Card, CardContent } from '@mui/material';

import { getDeclensionWordByCount } from '../../../utils/wordHelper';

import s from './Info.module.scss';

type CartInfoProps = {
  count: number;
  weight: number;
  price: number;
  delivery: number;
  discount: number;
};

export function CartInfo({ count, weight, price, delivery, discount }: CartInfoProps) {
  const productsCountText = getDeclensionWordByCount(count, [
    'товаров',
    'товар',
    'товара',
  ]);

  return (
    <Card className={s.card}>
      <CardContent className={s.content}>
        <div className={s.total}>
          <span>Итого</span>
          <span>
            {price + delivery - discount}
            ₽
          </span>
        </div>
        <div className={s.footnote}>
          <span>{`Всего: ${count} ${productsCountText} • ${weight}кг`}</span>
          <span>
            {price}
            ₽
          </span>
        </div>
        <div className={s.footnote}>
          <span>Доставка</span>
          <span>
            {delivery}
            ₽
          </span>
        </div>
        <div className={s.footnote}>
          <span>Скидка</span>
          <span className={s.discount}>
            -
            {discount}
            ₽
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
