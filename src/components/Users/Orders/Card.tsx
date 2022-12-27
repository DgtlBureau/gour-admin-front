import React from 'react';

import { format } from 'date-fns';

import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Typography } from '@mui/material';

import { Box } from 'components/UI/Box/Box';

import sx from './Card.styles';
import { OrderCardInfo } from './CardInfo';
import { OrderCardProduct, OrderProductType } from './CardProduct';

type Promotion = {
  title: string;
  amount: number;
};

export type FullOrder = {
  id: string;
  title: string;
  status?: Record<string, string>;
  createdAt: Date;
  address: string;
  client: string;
  products: OrderProductType[];
  promotions: Promotion[];
  deliveryCost: number;
  currency: string;
  totalSum: number;
};

export type OrdersCardProps = {
  order: FullOrder;
};

export function OrdersCard({ order }: OrdersCardProps) {
  const { title, status, createdAt, address, client, products, promotions, deliveryCost, totalSum } = order;

  const productCount = products.length;

  const createdDate = format(createdAt, 'dd.MM.yyyy');
  const createdTime = format(createdAt, 'HH:mm');

  const summaryDiscount = promotions.reduce((acc, currentDiscount) => acc + currentDiscount.amount, 0);

  return (
    <Accordion>
      <AccordionSummary>
        <Grid container sx={sx.header}>
          <Grid item sm={3} xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6'>{`Заказ ${title}`}</Typography>

            <Box sx={{ ...sx.total, display: 'none' }}>
              <Typography variant='h6' sx={sx.totalText}>
                {totalSum} ₽
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={5} xs={12} sx={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
            <Typography sx={{ ...sx.status, backgroundColor: status?.color || 'secondary.main' }}>
              {status?.name || 'ожидание'}
            </Typography>

            <Typography variant='body1' sx={sx.muted}>
              от {createdDate} в {createdTime}
            </Typography>
          </Grid>

          <Grid item sm={2} xs={12}>
            <Typography variant='body1' sx={{ ...sx.muted, ...sx.count }}>
              Продуктов: {productCount}
            </Typography>
          </Grid>

          <Grid item sm={2} xs={12} sx={sx.total}>
            <Typography variant='h6' sx={sx.totalText}>
              {totalSum} ₽
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>

      <Divider variant='fullWidth' sx={{ margin: '20px 0 0 0' }} />

      <AccordionDetails>
        <Box sx={sx.contacts}>
          <Typography sx={sx.muted} variant='body1'>
            Адрес доставки:&nbsp;
          </Typography>

          <Typography variant='body1'>{address}</Typography>
        </Box>

        <Box sx={sx.contacts}>
          <Typography sx={sx.muted} variant='body1'>
            Получатель:&nbsp;
          </Typography>
          <Typography variant='body1'>{client}</Typography>
        </Box>

        <Divider variant='fullWidth' sx={{ margin: '20px 0 0 0' }} />

        {products.map(product => (
          <OrderCardProduct key={`${product.amount}_${product.photo}`} product={product} />
        ))}

        {!!products.length && <Divider variant='fullWidth' />}

        <OrderCardInfo
          totalSum={totalSum}
          summaryDiscount={summaryDiscount}
          promotions={promotions}
          deliveryCost={deliveryCost}
        />
      </AccordionDetails>
    </Accordion>
  );
}
