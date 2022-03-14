import React, { useState } from 'react';
import classNames from 'classnames';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Grid,
  Menu,
  MenuItem,
} from '@mui/material';

import HeartIcon from '@mui/icons-material/Favorite';

import starIcon from '../../assets/icons/stars/gray-star.svg';
import cartIcon from '../../assets/icons/cart.svg';
import bucketIcon from '../../assets/icons/bucket.svg';
import plusIcon from '../../assets/icons/plus.svg';
import minusIcon from '../../assets/icons/minus.svg';
import arrowIcon from '../../assets/icons/arrow.svg';

import s from './ProductCard.module.scss';

const listOldPriceSx = {
  marginLeft: '4px',
  fontSize: '13px',
  textDecoration: 'line-through',
  color: '#778192',
};

const listItemSx = {
  fontSize: '15px',
};

export type Weight = {
  value: number;
  unit: 'г' | 'кг';
};

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

export function ProductCard(props: ProductCardProps) {
  const {
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
  } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const getCost = (weight: Weight) => (price / (weight.unit === 'г' ? 100 : 1000)) * weight.value;

  const currentWeight = weights[weightId];
  const total = getCost(currentWeight);

  const openList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };
  const closeList = () => setAnchorEl(null);

  const selectWeight = (i: number) => {
    onEdit(i);
    setAnchorEl(null);
  };
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

        <div className={s.rating_n_cost}>
          <div className={s.rating}>
            <img src={starIcon} alt="" />
            <span>{rating}</span>
          </div>

          <span>{cost}</span>
        </div>

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
        <div className={s.docket}>
          <div className={s.weight_n_discount}>
            {discount && (
              <>
                <span className={s.old_price}>
                  {total}
                  ₽
                </span>
                {!inCart && ' / '}
              </>
            )}
            {!inCart && (
              <span className={s.weight}>
                {currentWeight.value}
                {currentWeight.unit}
              </span>
            )}
          </div>

          <div className={s.total}>
            <span className={classNames(s.price, discount && s.with_discount)}>
              {discount ? total * (1 - discount) : total}
              ₽
            </span>
            {!inCart && (
              <>
                <IconButton onClick={openList}>
                  <img src={arrowIcon} alt="" />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={!!anchorEl}
                  onClose={closeList}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  {weights.map((weight, i) => (
                    <MenuItem
                      key={`${weight.value}${weight.unit}`}
                      selected={i === weightId}
                      onClick={() => selectWeight(i)}
                      sx={listItemSx}
                    >
                      <span>
                        {weight.value}
                        {weight.unit}
                        {' / '}
                        {discount ? getCost(weight) * (1 - discount) : getCost(weight)}
                        ₽
                      </span>
                      {discount && (
                        <span style={listOldPriceSx}>
                          {getCost(weight)}
                          ₽
                        </span>
                      )}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </div>
        </div>

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
      </CardActions>
    </Card>
  );
}
