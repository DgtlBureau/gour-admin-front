import React from 'react';

import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import { getDeclensionWordByCount } from '../../utils/wordHelper';

const sx = {
  docket: {
    margin: '40px 0',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    color: '#778192',
    '&:last-child': {
      marginBottom: '10px',
    },
  },
  label: {
    fontSize: '15px',
    whiteSpace: 'nowrap',
  },
  value: {
    fontSize: '18px',
    fontWeight: 700,
  },
  discountValue: {
    color: '#FF4E4E',
  },
  total: {
    color: '#25262D',
  },
  totalValue: {
    fontSize: '24px',
  },
  divider: {
    width: '100%',
    margin: '0 10px',
    border: '1px dashed rgba(0, 0, 0, 0.2)',
  },
};

type Props = {
  productsCount: number;
  cost: number;
  discount?: number;
  delivery: number;
}

export function OrderFormDocket({
  productsCount,
  cost,
  discount = 0,
  delivery,
}: Props) {
  const total = cost + delivery - discount;
  const productsDeclision = getDeclensionWordByCount(productsCount, [
    'товаров',
    'товар',
    'товара',
  ]);

  return (
    <Box sx={sx.docket}>
      <Box sx={sx.field}>
        <Typography sx={sx.label}>
          {productsCount}
          {' '}
          {productsDeclision}
        </Typography>
        <hr style={sx.divider} />
        <Typography sx={sx.value}>
          {cost}
          ₽
        </Typography>
      </Box>

      {
        !!discount && (
          <Box sx={sx.field}>
            <Typography sx={sx.label}>Скидка</Typography>
            <hr style={sx.divider} />
            <Typography sx={{ ...sx.value, ...sx.discountValue }}>
              -
              {discount}
              ₽
            </Typography>
          </Box>
        )
      }

      <Box sx={sx.field}>
        <Typography sx={sx.label}>Доставка</Typography>
        <hr style={sx.divider} />
        <Typography sx={sx.value}>
          {delivery}
          ₽
        </Typography>
      </Box>

      <Box sx={{ ...sx.field, ...sx.total }}>
        <Typography sx={sx.label}>Итого</Typography>
        <hr style={sx.divider} />
        <Typography sx={{ ...sx.value, ...sx.totalValue }}>
          {total}
          ₽
        </Typography>
      </Box>
    </Box>
  );
}
