import React, { useEffect, useState } from 'react';

import { Grid, Stack } from '@mui/material';
import { MultiValue, SingleValue } from 'react-select';
import { tab } from '@testing-library/user-event/dist/tab';
import { ProductSelectCard } from './Card';

import { Tabs } from '../Tabs/Tabs';
import { Typography } from '../UI/Typography/Typography';
import { TextField } from '../UI/TextField/TextField';
import { Select, SelectOption } from '../UI/Select/Select';
import { ProductSelectList } from './CardsList';
import { SelectsList } from './SelectsList';

export type Product = {
  id: number;
  title: string;
  image: string;
  category: string;
  characteristics: {
    key: string;
    value: string;
  }[];
};

export type Characteristic = {
  key: string;
  label: string;
  category: string;
  values: {
    key: string;
    label: string;
  }[];
};

export type ProductSelectFormProps = {
  selected: number[];
  categories: {
    label: string;
    value: string;
  }[];
  characteristics: Characteristic[];
  products: Product[];
  onChange(selected: number[]): void;
};

export function ProductSelectForm({
  products,
  categories,
  characteristics,
}: ProductSelectFormProps) {
  const [selectedProductsId, setSelectedProductsId] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTabId, setSelectedTabId] = useState<string>('All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectValues, setSelectValues] = useState<Record<string, string | undefined>>(
    {}
  );

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
    const isProductSelected = selectedProductsId.includes(productId);

    if (isProductSelected) {
      const newSelectedProductsList = selectedProductsId.filter(id => id !== productId);
      return setSelectedProductsId(newSelectedProductsList);
    }
    return setSelectedProductsId(prevList => [...prevList, productId]);
  };

  const handleChangeTab = (tabId: string) => {
    setSelectedTabId(tabId);
    setSelectValues({});
  };

  const isProductSelected = (productId: number) => selectedProductsId.includes(productId);

  const filterProductsByTab = (productsList: Product[], tabId: string) => productsList.filter((product: Product) => {
    switch (tabId) {
      case 'selected':
        return isProductSelected(product.id);
      default:
        return product.category === tabId || tabId === 'All';
    }
  });

  // eslint-disable-next-line
  const filterProductsByQuery = (productsList: Product[], query: string) => productsList.filter(product => product.title.toLowerCase().includes(query));

  const filterProductsBySelects = (
    productsList: Product[],
    selectsValues: Record<string, string | undefined>
  ) => {
    const filerFunction = (product: Product) => {
      const selects = product.characteristics.map(characteristic => {
        if (selectValues[characteristic.key]) return selectValues[characteristic.key] === characteristic.value;

        return true;
      });

      return !selects.includes(false);
    };

    return productsList.filter(filerFunction);
  };

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    const filteredProductsByTab = filterProductsByTab(products, selectedTabId);
    const filteredProductsBySelect = filterProductsBySelects(
      filteredProductsByTab,
      selectValues
    );
    if (query) return setFilteredProducts(filterProductsByQuery(filteredProductsBySelect, query));
    return setFilteredProducts(filteredProductsBySelect);
  }, [products, searchQuery, selectedTabId, selectValues]);

  const filteredCharacteristics = characteristics.filter(
    characteristic => characteristic.category === selectedTabId || characteristic.category === 'all'
  );

  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            label="Поиск"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">
            Количество добавленных товаров:
            {' '}
            {selectedProductsId.length}
          </Typography>
        </Grid>
      </Grid>

      <Tabs selectedId={selectedTabId} options={tabOptions} onChange={handleChangeTab} />
      <SelectsList
        characteristics={filteredCharacteristics}
        selectValues={selectValues}
        setSelectValues={setSelectValues}
      />
      <ProductSelectList
        products={filteredProducts}
        searchQuery={searchQuery}
        checkProductSelect={isProductSelected}
        onClickProduct={handleProductClick}
      />
    </Stack>
  );
}
