import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { CreateStockFormDto } from '../../../../@types/dto/form/create-stock.dto';
import { Category } from '../../../../@types/entities/Category';
import { HFDatePicker } from '../../../HookForm/HFDatePicker';
import { HFTextField } from '../../../HookForm/HFTextField';
import { HFUploadPhoto } from '../../../HookForm/HFUploadPhoto';
import {
  Characteristic,
  Product,
  ProductSelectForm,
} from '../../../Product/SelectForm/SelectForm';
import { TabPanel } from '../../../UI/Tabs/TabPanel';
import { Tabs } from '../../../UI/Tabs/Tabs';
import { Button } from '../../../UI/Button/Button';
import { Typography } from '../../../UI/Typography/Typography';
import schema from './validation';

type Props = {
  products: Product[];
  categories: {
    label: string;
    value: string;
  }[];
  characteristics: Characteristic[];
  defaultValues: CreateStockFormDto;
  onSubmit: (data: CreateStockFormDto) => void;
  onCancel: () => void;
};

const tabOptions = [
  {
    value: 'basicSettings',
    label: 'Основная информация',
  },
  {
    value: 'products',
    label: 'Товары участвующие в акции',
  },
];

export function CreateStockForm({
  products,
  categories,
  characteristics,
  defaultValues,
  onSubmit,
  onCancel,
}: Props) {
  const [selectedTabKey, setSelectedTabKey] = useState<string>('basicSettings');

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const [error, setError] = useState<string>('');

  const values = useForm<CreateStockFormDto>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    console.log(selectedProducts);
    if (selectedProducts.length === 0) return;
    setError('');
  }, [selectedProducts]);

  const handleSubmit = (data: CreateStockFormDto) => {
    if (selectedProducts.length === 0) setError('Пожалуйста, выберите товары, участвующие в акции');
    else {
      onSubmit({
        ...data,
        productIdList: selectedProducts,
      });
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={9}>
          <Tabs
            value={selectedTabKey}
            options={tabOptions}
            onChange={setSelectedTabKey}
          />
        </Grid>
        <Grid item xs={3}>
          <Button sx={{ margin: '0 10px 0 0' }} type="submit" form="createStockForm">
            Сохранить
          </Button>
          <Button type="button" onClick={onCancel}>
            Отмена
          </Button>
        </Grid>
      </Grid>
      {error && (
        <Typography variant="body1" sx={{ color: 'red' }}>
          {error}
        </Typography>
      )}
      <TabPanel index={selectedTabKey} value="basicSettings">
        <FormProvider {...values}>
          <form id="createStockForm" onSubmit={values.handleSubmit(handleSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <HFTextField name="title" label="Заголовок" />
              </Grid>
              <Grid item xs={12}>
                <HFTextField multiline name="description" label="Описание" />
              </Grid>
              <Grid item xs={12} container spacing={2}>
                <Grid item xs={4}>
                  <HFDatePicker
                    sx={{ width: '100%' }}
                    name="startDate"
                    label="Дата начала"
                  />
                </Grid>
                <Grid item xs={4}>
                  <HFDatePicker
                    sx={{ width: '100%' }}
                    name="endDate"
                    label="Дата завершения"
                  />
                </Grid>
                <Grid item xs={4}>
                  <HFTextField name="stockPercent" label="Процент скидки" />
                </Grid>
                <Grid item xs={12} container spacing={2}>
                  <Grid item xs={5}>
                    <HFUploadPhoto
                      label="Фото 1:1"
                      name="fullPhoto"
                      id="fullPhoto"
                      allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <HFUploadPhoto
                      label="Фото 1:2"
                      name="smallPhoto"
                      id="smallPhoto"
                      allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <HFTextField name="metaTitle" label="metaTitle" />
                </Grid>
                <Grid item xs={6}>
                  <HFTextField name="metaDescription" label="metaDescription" />
                </Grid>
                <Grid item xs={6}>
                  <HFTextField name="metaKeywords" label="metaKeywords" />
                </Grid>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </TabPanel>
      <TabPanel index={selectedTabKey} value="products">
        <ProductSelectForm
          selected={selectedProducts}
          categories={categories}
          characteristics={characteristics}
          products={products}
          onChange={setSelectedProducts}
        />
      </TabPanel>
    </>
  );
}
