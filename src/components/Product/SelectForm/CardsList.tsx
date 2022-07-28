import React from 'react';
import { Grid } from '@mui/material';

import { ProductSelectCard } from './Card';
import { Product } from './SelectForm';
import { Typography } from '../../UI/Typography/Typography';

type Props = {
  products: Product[];
  searchQuery: string;
  checkProductSelect: (id: number) => boolean;
  onClickProduct: (id: number) => void;
};

export function ProductSelectList({
  products,
  searchQuery,
  onClickProduct,
  checkProductSelect,
}: Props) {
  if (!products.length) {
    return (
      <Typography sx={{ marginTop: '20px' }} variant="h5">
        Товары не найдены
      </Typography>
    );
  }
  return (
    <Grid sx={{ marginTop: '20px' }} container>
      {
        products.map(product => (
          <Grid item xs={4} md={3} lg={2} key={product.id}>
            <ProductSelectCard
              image={product.image}
              title={product.title || 'Без названия'}
              searchQuery={searchQuery}
              isSelected={checkProductSelect(product.id)}
              onSelect={() => onClickProduct(product.id)}
            />
          </Grid>
        ))
      }
    </Grid>
  );
}
