import React, { useEffect, useState } from 'react';

import { Grid, Stack } from '@mui/material';
import { ProductSelectCard } from './ProductSelectCard';

import { Tabs } from '../Tabs/Tabs';
import { Typography } from '../UI/Typography/Typography';
import { TextField } from '../UI/TextField/TextField';

type Product = {
  id: number;
  title: string;
  image: string;
  category: string;
  characteristics: Record<string, string>;
};

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
  products: Product[];
  onChange(selected: number[]): void;
};

export function ProductSelectForm({ products, categories }: ProductSelectFormProps) {
  const [selectedProductsId, setSelectedProductsId] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTabId, setSelectedTabId] = useState<string>('All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

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

  const filterProductsByTab = (productsList: Product[], tabId: string) => productsList.filter((product: Product) => {
    switch (tabId) {
      case 'selected':
        return isProductSelected(product.id);
      default:
        return product.category === tabId || tabId === 'All';
    }
  });

  // TODO: убрать, подраться с ес линтом
  // eslint-disable-next-line
  const searchProductsByQuery = (productsList: Product[], query: string) => productsList.filter((product: Product) => product.title.toLowerCase().includes(query));

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    const filteredByTabProducts = filterProductsByTab(products, selectedTabId);
    if (query) return setFilteredProducts(searchProductsByQuery(filteredByTabProducts, query));
    return setFilteredProducts(filteredByTabProducts);
  }, [products, searchQuery, selectedTabId]);

  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Поиск"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </Grid>
      </Grid>
      {tabs && (
        <Tabs
          selectedId={tabs.selectedId}
          options={tabs.options}
          onChange={tabs.onChange}
        />
      )}
      <Grid sx={{ margin: '10px 0 0 0' }} container spacing={2}>
        {!filteredProducts.length && (
          <Typography variant="h5">Товары не найдены</Typography>
        )}
        {filteredProducts.map(product => (
          <Grid item lg={3} key={product.id}>
            <ProductSelectCard
              image={product.image}
              title={product.title}
              searchQuery={searchQuery}
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
