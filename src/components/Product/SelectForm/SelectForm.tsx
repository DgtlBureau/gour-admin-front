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
  onChange(selected: number[]): void;
  isLoading?: boolean;
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
  onChange,
  isLoading,
}: ProductSelectFormProps) {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>(selected);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTabKey, setSelectedTabKey] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectValues, setSelectValues] = useState<Record<string, string | undefined>>(
    {}
  );
  useEffect(() => {
    onChange(selectedProductIds);
  }, [selectedProductIds]);

  const tabOptions = [
    ...defaultTabs,
    ...categories.map(category => ({
      value: category.value,
      label: category.label,
    })),
  ];

  useEffect(() => {
    onChange(selectedProductIds);
  }, [selectedProductIds]);

  const handleProductClick = (productId: number) => {
    if (isProductSelected(productId, selectedProductIds)) {
      const newSelectedProductsList = selectedProductIds.filter(id => id !== productId);
      return setSelectedProductIds(newSelectedProductsList);
    }
    return setSelectedProductIds(prevList => [...prevList, productId]);
  };
  const handleChangeTab = (tabKey: string) => {
    setSelectedTabKey(tabKey);
    setSelectValues({});
  };

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    setFilteredProducts(
      filterByAllParams(products, query, selectValues, selectedTabKey, selectedProductIds)
    );
  }, [products, searchQuery, selectedTabKey, selectValues]);

  const filteredCharacteristics = Object.keys(ALL_CHARACTERISTICS)
    .map(key => ({ ...ALL_CHARACTERISTICS[key], key }))
    .filter(
      characteristic => characteristic.categoryKey === selectedTabKey ||
        characteristic.categoryKey === 'all'
    );

  if (isLoading) {
    return <ProgressLinear variant="query" />;
  }

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
            {selectedProductIds.length}
          </Typography>
        </Grid>
      </Grid>

      <Tabs value={selectedTabKey} options={tabOptions} onChange={handleChangeTab} />
      <SelectsList
        characteristics={filteredCharacteristics}
        selectValues={selectValues}
        setSelectValues={setSelectValues}
      />
      <ProductSelectList
        products={filteredProducts}
        searchQuery={searchQuery}
        checkProductSelect={(id: number) => isProductSelected(id, selectedProductIds)}
        onClickProduct={handleProductClick}
      />
    </Stack>
  );
}
