import React, { useMemo, useState } from 'react';

import { Grid, Stack } from '@mui/material';

import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { Tabs } from 'components/UI/Tabs/Tabs';
import { TextField } from 'components/UI/TextField/TextField';
import { Typography } from 'components/UI/Typography/Typography';

import { ProductSelectList } from './CardsList';
import { SelectsList } from './SelectsList';
import { defaultTabs, filterByAllParams, isProductSelected } from './selectHelper';
import { Product, ProductSelectFormProps, TabsKeys } from './types';

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

export function ProductSelectForm({
  selected = [],
  products,
  categories,
  isLoading,
  onChange,
}: ProductSelectFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTabKey, setSelectedTabKey] = useState<TabsKeys>('all');
  const [selectValues, setSelectValues] = useState<Record<string, string | number>>({});

  const filteredProducts = useMemo<Product[]>(() => {
    const query = searchQuery.trim().toLowerCase();
    return filterByAllParams(products, query, selectValues, selectedTabKey, selected);
  }, [products, searchQuery, selectedTabKey, selectValues]);

  const tabOptions = [
    ...defaultTabs,
    ...categories.map(category => ({
      value: category.id,
      label: category.title.ru,
    })),
  ];

  const categoriesForFilters = categories.find(topCategory => topCategory.id === selectedTabKey)?.subCategories || [];

  const selectProduct = (productId: number) => {
    if (isProductSelected(productId, selected)) {
      const newSelectedProductsList = selected.filter(id => id !== productId);

      return onChange(newSelectedProductsList);
    }

    return onChange([...selected, productId]);
  };

  const changeTab = (tabKey: TabsKeys) => {
    setSelectedTabKey(tabKey);
    setSelectValues({});
  };

  return (
    <Stack>
      {isLoading && <ProgressLinear variant='query' />}

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={6}>
          <TextField label='Поиск' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </Grid>

        <Grid item sx={sx.productsCount} xs={12} md={4} lg={6}>
          <Typography variant='body1'>Количество добавленных товаров: {selected.length}</Typography>
        </Grid>
      </Grid>

      <Tabs sx={sx.tabs} value={selectedTabKey} options={tabOptions} onChange={changeTab} />

      <SelectsList categories={categoriesForFilters} selectValues={selectValues} setSelectValues={setSelectValues} />

      <ProductSelectList
        products={filteredProducts}
        searchQuery={searchQuery}
        checkProductSelect={(id: number) => isProductSelected(id, selected)}
        onClickProduct={selectProduct}
      />
    </Stack>
  );
}
