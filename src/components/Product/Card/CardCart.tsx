import React from 'react';
import { Grid, IconButton } from '@mui/material';

import { Weight } from '../../../@types/entities/Product';

import cartIcon from '../../../assets/icons/cart.svg';
import bucketIcon from '../../../assets/icons/bucket.svg';
import plusIcon from '../../../assets/icons/plus.svg';
import minusIcon from '../../../assets/icons/minus.svg';

import s from './Card.module.scss';

type Props = {
  inCart: boolean;
  weights: Weight[];
  weightId: number;
  currentWeight: Weight;
  onAdd: () => void;
  increaseWeight: () => void;
  decreaseWeight: () => void;
}

export function ProductCardCart({
  inCart,
  currentWeight,
  weights,
  weightId,
  onAdd,
  increaseWeight,
  decreaseWeight,
}: Props) {
  return (
    <div className={s.cart}>
      {!inCart ? (
        <IconButton onClick={onAdd}>
          <img src={cartIcon} alt="" />
        </IconButton>
      ) : (
        <Grid container>
          <Grid item xs={4}>
            <IconButton className={s.remove} onClick={decreaseWeight}>
              <img src={weightId === 0 ? bucketIcon : minusIcon} alt="" />
            </IconButton>
          </Grid>

          <Grid item xs={4}>
            {currentWeight.value}
            {currentWeight.unit}
          </Grid>

          <Grid item xs={4}>
            {weightId + 1 !== weights.length && (
              <IconButton className={s.add} onClick={increaseWeight}>
                <img src={plusIcon} alt="" />
              </IconButton>
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
}
