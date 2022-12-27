import React from 'react';

import { Divider, Stack } from '@mui/material';

import { Typography } from 'components/UI/Typography/Typography';

const sx = {
  card: {
    background: 'secondary',
    borderRadius: '6px',
    padding: '30px',
    margin: '20px 0 0 0',
  },
  price: {
    fontSize: '13px',
  },
  total: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  discount: {
    color: 'error.main',
  },
};

type OrderCardInfoProps = {
  totalSum: number;
  summaryDiscount: number;
  promotions: {
    title: string;
    amount: number;
  }[];
  deliveryCost: number;
};

export function OrderCardInfo({ totalSum, promotions, summaryDiscount, deliveryCost }: OrderCardInfoProps) {
  return (
    <Stack sx={sx.card}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='h6' sx={sx.total}>
          Товары на сумму
        </Typography>

        <Typography variant='h6' sx={sx.total}>
          {totalSum} ₽
        </Typography>
      </Stack>

      {promotions.map(
        promotion =>
          promotion.title && (
            <Stack
              key={`${promotion.title}${promotion.amount}`}
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='body2' sx={sx.price}>
                {promotion.title}
              </Typography>

              <Typography variant='body2' sx={{ ...sx.price, ...sx.discount }}>
                -{promotion.amount} ₽
              </Typography>
            </Stack>
          ),
      )}

      <Divider variant='fullWidth' sx={{ margin: '10px 0' }} />

      {!!summaryDiscount && (
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='body2' sx={{ ...sx.price, ...sx.discount }}>
            Всего сэкономлено
          </Typography>

          <Typography variant='body2' sx={{ ...sx.price, ...sx.discount }}>
            -{summaryDiscount} ₽
          </Typography>
        </Stack>
      )}

      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='h6' sx={sx.total}>
          Всего
        </Typography>

        <Typography variant='h6' sx={sx.total}>
          {totalSum} ₽
        </Typography>
      </Stack>

      {/* <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='body2' sx={sx.price}>
          Доставка
        </Typography>

        <Typography variant='body2' sx={sx.price}>
          {deliveryCost} ₽
        </Typography>
      </Stack> */}
    </Stack>
  );
}
