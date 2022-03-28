import React, { useEffect, useState } from 'react';

import { Grid, Stack } from '@mui/material';
import { ProductSelectCard } from './ProductSelectCard';

import s from './ProductSelectForm.module.scss';
import { Tabs } from '../Tabs/Tabs';
import { Typography } from '../UI/Typography/Typography';

export type ProductSelectFormProps = {
  selected: number[];
  categories: {
    label: string;
    value: string;
  }[];
  characteristics: {
    key: string;
    label: string;
    category: number;
    values: {
      key: string;
      label: string;
    }[];
  }[];
  products: {
    id: number;
    title: string;
    image: string;
    category: string;
    characteristics: Record<string, string>;
  }[];
  onChange(selected: number[]): void;
};

export function ProductSelectForm({ products, categories }: ProductSelectFormProps) {
  const [selectedProductsId, setSelectedProductsId] = useState<number[]>([]);
  const [selectedTabId, setSelectedTabId] = useState<string>('All');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const tabOptions = [
    {
      id: 'All',
      label: 'Все',
    },
    ...categories.map(category => ({
      id: category.value,
      label: category.label,
    })),
    {
      id: 'selected',
      label: 'Выбранные товары',
    },
  ];

  const handleProductClick = (productId: number) => {
    const isProductSelected = !!selectedProductsId.find(id => id === productId);

    if (isProductSelected) {
      const newSelectedProductsList = selectedProductsId.filter(id => id !== productId);
      return setSelectedProductsId(newSelectedProductsList);
    }
    return setSelectedProductsId(prevList => [...prevList, productId]);
  };

  const isProductSelected = (productId: number) => !!selectedProductsId.find(id => id === productId);

  const tabs = {
    selectedId: selectedTabId,
    options: tabOptions,
    onChange: setSelectedTabId,
  };

  useEffect(() => {
    setFilteredProducts(
      products.filter(product => {
        switch (selectedTabId) {
          case 'selected':
            return isProductSelected(product.id);
          default:
            return product.category === selectedTabId || selectedTabId === 'All';
        }
      })
    );
  }, [products, selectedTabId]);

  return (
    <Stack>
      {tabs && (
        <Tabs
          selectedId={tabs.selectedId}
          options={tabs.options}
          onChange={tabs.onChange}
        />
      )}
      <Grid sx={{ margin: '10px 0 0 0' }} container spacing={2}>
        {!filteredProducts.length && <Typography variant="h5">Список пуст</Typography>}
        {filteredProducts.map(product => (
          <Grid item lg={3} key={product.id}>
            <ProductSelectCard
              image={product.image}
              title={product.title}
              isSelected={isProductSelected(product.id)}
              onSelect={() => {
                handleProductClick(product.id);
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
