import React, { useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';

import { Typography } from '../../UI/Typography/Typography';
import { TextField } from '../../UI/TextField/TextField';
import { ProductSelectList } from './CardsList';
import { SelectsList } from './SelectsList';
import { Tabs } from '../../UI/Tabs/Tabs';
import { isProductSelected, filterByAllParams } from './selectHelper';
import { ProgressLinear } from '../../UI/ProgressLinear/ProgressLinear';
import { ALL_CHARACTERISTICS } from '../../../constants/characteristics';
import { TranslatableString } from '../../../@types/entities/TranslatableString';

const sx = {
  productsCount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tabs: {
    padding: '20px 0',
  },
};

export type Product = {
  id: number;
  title: string;
  image: string;
  category: string;
  characteristics: { [key in string]: string };
};

export type SelectCharacteristic = {
  key: string;
  label: TranslatableString;
  categoryKey: string;
  values: {
    key: string;
    label: TranslatableString;
  }[];
};

export type ProductSelectFormProps = {
  selected: number[];
  categories: {
    value: string;
    label: string;
  }[];
  products: Product[];
  isLoading?: boolean;
  onChange(selected: number[]): void;
};

const TAB_ALL = {
  value: 'all',
  label: 'Все',
};

const TAB_SELECTED = {
  value: 'selected',
  label: 'Выбранные товары',
};

const defaultTabs = [TAB_ALL, TAB_SELECTED];

export function ProductSelectForm({
  selected,
  products,
  categories,
  isLoading,
  onChange,
}: ProductSelectFormProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTabKey, setSelectedTabKey] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectValues, setSelectValues] = useState<Record<string, string | undefined>>(
    {}
  );

  const tabOptions = [
    ...defaultTabs,
    ...categories.map(category => ({
      value: category.value,
      label: category.label,
    })),
  ];

  const filteredCharacteristics = Object.keys(ALL_CHARACTERISTICS)
    .map(key => ({ ...ALL_CHARACTERISTICS[key], key }))
    .filter(
      characteristic =>
        characteristic.categoryKey === selectedTabKey ||
        characteristic.categoryKey === 'all'
    );

  const selectProduct = (productId: number) => {
    if (isProductSelected(productId, selected)) {
      const newSelectedProductsList = selected.filter(id => id !== productId);

      return onChange(newSelectedProductsList);
    }

    return onChange([...selected, productId]);
  };

  const changeTab = (tabKey: string) => {
    setSelectedTabKey(tabKey);
    setSelectValues({});
  };

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();

    setFilteredProducts(
      filterByAllParams(products, query, selectValues, selectedTabKey, selected)
    );
  }, [products, searchQuery, selectedTabKey, selectValues]);

  return (
    <Stack>
      {isLoading && <ProgressLinear variant="query" />}

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={6}>
          <TextField
            label="Поиск"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </Grid>
        <Grid item sx={sx.productsCount} xs={12} md={4} lg={6}>
          <Typography variant="body1">
            Количество добавленных товаров: {selected.length}
          </Typography>
        </Grid>
      </Grid>

      <Tabs
        sx={sx.tabs}
        value={selectedTabKey}
        options={tabOptions}
        onChange={changeTab}
      />

      <SelectsList
        characteristics={filteredCharacteristics}
        selectValues={selectValues}
        setSelectValues={setSelectValues}
      />

      <ProductSelectList
        products={filteredProducts}
        searchQuery={searchQuery}
        checkProductSelect={(id: number) => isProductSelected(id, selected)}
        onClickProduct={selectProduct}
      />
    </Stack>
  );
}
