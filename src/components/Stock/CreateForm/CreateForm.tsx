import React, { useEffect, useState, RefObject } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, FormControlLabel, FormLabel } from '@mui/material';

import { Product, ProductSelectForm } from '../../Product/SelectForm/SelectForm';
import { Box } from '../../UI/Box/Box';
import { TabPanel } from '../../UI/Tabs/TabPanel';
import { Tabs } from '../../UI/Tabs/Tabs';
import { Typography } from '../../UI/Typography/Typography';
import { RadioButton } from '../../UI/RadioButton/RadioButton';
import { HFDatePicker } from '../../HookForm/HFDatePicker';
import { HFTextField } from '../../HookForm/HFTextField';
import { HFTextarea } from '../../HookForm/HFTextarea';
import { HFUploadPhoto } from '../../HookForm/HFUploadPhoto';
import { HFRadioGroup } from '../../HookForm/HFRadioGroup';
import { CreateStockFormDto } from '../../../@types/dto/form/create-stock.dto';
import schema from './validation';

type Props = {
  products: Product[];
  categories: {
    label: string;
    value: string;
  }[];
  defaultValues?: CreateStockFormDto;
  submitBtnRef?: RefObject<HTMLButtonElement>;
  onValidityChange: (value: boolean) => void;
  onSubmit: (data: CreateStockFormDto) => void;
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
  defaultValues,
  submitBtnRef,
  onValidityChange,
  onSubmit,
}: Props) {
  const [selectedTabKey, setSelectedTabKey] = useState<string>('basicSettings');

  const [selectedProducts, setSelectedProducts] = useState<number[]>(
    defaultValues?.productIdList || []
  );

  const [error, setError] = useState<string>('');

  const values = useForm<CreateStockFormDto>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const isValid = values.formState.isValid && selectedProducts.length !== 0;

  const selectProducts = (productIds: number[]) => {
    if (productIds.length === 0) return;
    setError('');
    setSelectedProducts(productIds);
  };

  const submit = (data: CreateStockFormDto) => {
    if (selectedProducts.length === 0) setError('Пожалуйста, выберите товары, участвующие в акции');
    else onSubmit({ ...data, productIdList: selectedProducts });
  };

  useEffect(() => onValidityChange(isValid), [isValid]);

  useEffect(() => values.reset(defaultValues), [defaultValues]);

  return (
    <Box>
      <Tabs value={selectedTabKey} options={tabOptions} onChange={setSelectedTabKey} />
      {error && (
        <Typography variant="body1" sx={{ color: 'red', marginTop: '20px' }}>
          {error}
        </Typography>
      )}
      <TabPanel index={selectedTabKey} value="basicSettings">
        <FormProvider {...values}>
          <form id="createStockForm" onSubmit={values.handleSubmit(submit)}>
            <Grid container spacing={2} item md={12} lg={8}>
              <Grid item xs={12}>
                <HFTextField name="title" label="Заголовок*" />
              </Grid>

              <Grid item xs={12}>
                <HFTextarea name="description" label="Описание" />
              </Grid>

              <Grid item xs={12} container spacing={2}>
                <Grid item xs={4}>
                  <HFDatePicker
                    sx={{ width: '100%' }}
                    name="start"
                    label="Дата начала*"
                  />
                </Grid>

                <Grid item xs={4}>
                  <HFDatePicker
                    sx={{ width: '100%' }}
                    name="end"
                    label="Дата завершения*"
                  />
                </Grid>

                <Grid item xs={4}>
                  <HFTextField type="number" name="discount" label="Процент скидки*" />
                </Grid>

                <Grid item xs={12} container spacing={2}>
                  <Grid item md={4}>
                    <HFUploadPhoto
                      label="Фото 1:1"
                      name="fullPhoto"
                      id="fullPhoto"
                      allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
                      onDelete={() => {
                        console.log('delete full photo');
                      }}
                    />
                  </Grid>

                  <Grid item md={4}>
                    <HFUploadPhoto
                      label="Фото 1:2"
                      name="smallPhoto"
                      id="smallPhoto"
                      allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
                      onDelete={() => {
                        console.log('delete small photo');
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <FormLabel>Индексация</FormLabel>
                  <HFRadioGroup name="isIndexed">
                    <FormControlLabel value control={<RadioButton />} label="Да" />
                    <FormControlLabel
                      value={false}
                      control={<RadioButton />}
                      label="Нет"
                    />
                  </HFRadioGroup>
                </Grid>

                <Grid item xs={12}>
                  <HFTextField name="metaTitle" label="metaTitle" />
                  <HFTextField
                    sx={{ margin: '10px 0' }}
                    name="metaDescription"
                    label="metaDescription"
                  />
                  <HFTextField name="metaKeywords" label="metaKeywords" />
                </Grid>
              </Grid>
            </Grid>
            <button type="submit" ref={submitBtnRef} style={{ display: 'none' }}>
              {}
            </button>
          </form>
        </FormProvider>
      </TabPanel>

      <TabPanel index={selectedTabKey} value="products">
        <ProductSelectForm
          selected={selectedProducts}
          categories={categories}
          products={products}
          onChange={selectProducts}
        />
      </TabPanel>
    </Box>
  );
}
