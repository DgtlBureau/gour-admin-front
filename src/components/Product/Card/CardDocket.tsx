import React, { useState } from 'react';
import classNames from 'classnames';
import { Menu, MenuItem, IconButton } from '@mui/material';

import arrowIcon from '../../../assets/icons/arrow.svg';

import { Weight } from '../../../@types/entities/Product';

import s from './Card.module.scss';

const listOldPriceSx = {
  marginLeft: '4px',
  fontSize: '13px',
  textDecoration: 'line-through',
  color: '#778192',
};

const listItemSx = {
  fontSize: '15px',
};

type Props = {
  inCart: boolean;
  currentWeight: Weight;
  weights: Weight[];
  weightId: number;
  price: number;
  discount: number;
  onEdit: (id: number) => void;
}

export function ProductCardDocket({
  inCart,
  currentWeight,
  weights,
  weightId,
  price,
  discount,
  onEdit,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const getCost = (weight: Weight) => (price / (weight.unit === 'г' ? 100 : 1000)) * weight.value;

  const total = getCost(currentWeight);

  const openList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };
  const closeList = () => setAnchorEl(null);

  const selectWeight = (i: number) => {
    onEdit(i);
    setAnchorEl(null);
  };

  return (
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
  );
}
