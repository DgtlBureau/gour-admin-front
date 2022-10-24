import React, { RefObject, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, FormLabel, Grid } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { RadioButton } from 'components/UI/RadioButton/RadioButton';
import { Tabs } from 'components/UI/Tabs/Tabs';
import { Typography } from 'components/UI/Typography/Typography';

import { CreateStockFormDto } from 'types/dto/form/create-stock.dto';
import { TopLevelCategory } from 'types/entities/Category';

import { HFDatePicker } from '../../HookForm/HFDatePicker';
import { HFRadioGroup } from '../../HookForm/HFRadioGroup';
import { HFTextField } from '../../HookForm/HFTextField';
import { HFTextarea } from '../../HookForm/HFTextarea';
import { HFUploadPhoto } from '../../HookForm/HFUploadPhoto';
import { ProductSelectForm } from '../../Product/SelectForm/SelectForm';
import { Product } from '../../Product/SelectForm/types';
import schema from './validation';

type Props = {
  products: Product[];
  categories: TopLevelCategory[];
  defaultValues?: CreateStockFormDto;
  submitBtnRef?: RefObject<HTMLButtonElement>;
  onChange: (data: CreateStockFormDto) => void;
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

export function CreateStockForm({ products, categories, defaultValues, submitBtnRef, onChange }: Props) {
  const [selectedTabKey, setSelectedTabKey] = useState(tabOptions[0].value);
  const [selectedProducts, setSelectedProducts] = useState(defaultValues?.productIdList);

  const [error, setError] = useState<string | null>(null);

  const values = useForm<CreateStockFormDto>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const isSettings = selectedTabKey === 'basicSettings';

  const selectProducts = (productIds?: number[]) => {
    if (error) setError(null);

    setSelectedProducts(productIds);
  };

  const submit = (data: CreateStockFormDto) => {
    if (!selectedProducts?.length) setError('Пожалуйста, выберите товары, участвующие в акции');
    else onChange({ ...data, productIdList: selectedProducts });
  };

  useEffect(() => {
    values.reset(defaultValues);
    selectProducts(defaultValues?.productIdList);
  }, [defaultValues]);

  const resetField = (field: keyof CreateStockFormDto) => values.setValue(field, undefined);

  return (
    <Box>
      <Tabs value={selectedTabKey} options={tabOptions} onChange={setSelectedTabKey} sx={{ marginBottom: '20px' }} />

      {!!error && (
        <Typography variant='body1' sx={{ color: 'red', marginBottom: '20px' }}>
          {error}
        </Typography>
      )}

      <Box sx={{ display: isSettings ? 'flex' : 'none' }}>
        <FormProvider {...values}>
          <form
            id='createStockForm'
            onSubmit={values.handleSubmit(submit)}
            // onChange={() => change(values.getValues())}
          >
            <Grid container spacing={2} item md={12} lg={8}>
              <Grid item xs={12}>
                <HFTextField name='title' label='Заголовок*' />
              </Grid>

              <Grid item xs={12}>
                <HFTextarea name='description' label='Описание' />
              </Grid>

              <Grid item xs={12} container spacing={2}>
                <Grid item xs={4}>
                  <HFDatePicker sx={{ width: '100%' }} name='start' label='Дата начала*' />
                </Grid>

                <Grid item xs={4}>
                  <HFDatePicker sx={{ width: '100%' }} name='end' label='Дата завершения*' />
                </Grid>

                <Grid item xs={4}>
                  <HFTextField type='number' name='discount' label='Процент скидки*' />
                </Grid>

                <Grid item xs={12} container spacing={2}>
                  <Grid item xs={4}>
                    <HFUploadPhoto
                      label='Фото 1:1'
                      name='fullPhoto'
                      id='fullPhoto'
                      defaultValue={values.getValues('fullPhoto')}
                      allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
                      onDelete={() => resetField('fullPhoto')}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <HFUploadPhoto
                      label='Фото 1:2'
                      name='smallPhoto'
                      id='smallPhoto'
                      defaultValue={values.getValues('smallPhoto')}
                      allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
                      onDelete={() => resetField('smallPhoto')}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <FormLabel>Индексация</FormLabel>
                  <HFRadioGroup name='isIndexed'>
                    <FormControlLabel value control={<RadioButton />} label='Да' />
                    <FormControlLabel value={false} control={<RadioButton />} label='Нет' />
                  </HFRadioGroup>
                </Grid>

                <Grid item xs={12}>
                  <HFTextField name='metaTitle' label='metaTitle' />
                  <HFTextField sx={{ margin: '10px 0' }} name='metaDescription' label='metaDescription' />
                  <HFTextField name='metaKeywords' label='metaKeywords' />
                </Grid>
              </Grid>
            </Grid>
            <button type='submit' ref={submitBtnRef} style={{ display: 'none' }}>
              {}
            </button>
          </form>
        </FormProvider>
      </Box>

      <Box sx={{ display: !isSettings ? 'flex' : 'none' }}>
        <ProductSelectForm
          selected={selectedProducts}
          categories={categories}
          products={products}
          onChange={selectProducts}
        />
      </Box>
    </Box>
  );
}
