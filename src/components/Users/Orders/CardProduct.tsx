import React from 'react';

import { CardMedia, Grid } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { useTo } from 'hooks/useTo';

import sx from './CardProduct.styles';

export type OrderProductType = {
  photo: string;
  title: string;
  amount: number;
  gram: number;
  totalSum: number;
  totalSumWithoutAmount: number;
  cost: number;
};

type OrderCardProductProps = {
  product: OrderProductType;
};

export function OrderCardProduct({ product }: OrderCardProductProps) {
  const { toProductList } = useTo();

  const { photo, title, amount, gram, cost } = product;

  const handleClickDetail = toProductList;

  return (
    <Box sx={sx.card}>
      <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid container item xs={12} sm={7} sx={{ display: 'flex', alignItems: 'center' }}>
          <CardMedia sx={{ ...sx.image, display: 'flex' }} component='img' image={photo} onClick={handleClickDetail} />

          <Typography variant='body1' sx={sx.title} onClick={handleClickDetail}>
            {title}
          </Typography>
        </Grid>

        <Grid item sm={1.5} xs={4} sx={sx.count}>
          <Typography variant='body1' sx={sx.countText} color='text.muted'>
            {gram} гр
          </Typography>
        </Grid>

        <Grid item sm={1.5} xs={4} sx={sx.count}>
          <Typography variant='body1' sx={sx.countText} color='text.muted'>
            {amount} шт
          </Typography>
        </Grid>

        <Grid item sm={2} xs={4} sx={sx.price}>
          <Typography variant='body1' sx={sx.priceText}>
            {cost} ₽
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
