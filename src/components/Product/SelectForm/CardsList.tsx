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
      <Typography sx={{ margin: '20px 0 0 0' }} variant="h5">
        Товары не найдены
      </Typography>
    );
  }
  return (
    <Grid sx={{ margin: '50px 0 0 0' }} container spacing={2}>
      {products.map(product => (
        <Grid item lg={3} key={product.id}>
          <ProductSelectCard
            image={product.image}
            title={product.title}
            searchQuery={searchQuery}
            isSelected={checkProductSelect(product.id)}
            onSelect={() => {
              onClickProduct(product.id);
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
