import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, FormLabel, Grid } from '@mui/material';

import { RadioButton } from '../../UI/RadioButton/RadioButton';
import { HFTextField } from '../../HookForm/HFTextField';
import { HFSelect } from '../../HookForm/HFSelect';
import { HFTextarea } from '../../HookForm/HFTextarea';
import { HFRadioGroup } from '../../HookForm/HFRadioGroup';
import { HFUploadPhoto } from '../../HookForm/HFUploadPhoto';
import { ProductBasicSettingsFormDto } from '../../../@types/dto/form/product-basic-settings.dto';
import schema from './validation';

const sx = {
  header: {
    display: 'flex',
  },
  category: {
    marginLeft: '10px',
  },
  images: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  imageUpload: {
    marginRight: '10px',
  },
  meta: {
    marginBottom: '10px',
  },
};

type Props = {
  defaultValues?: ProductBasicSettingsFormDto;
  isLoading?: boolean;
  categories: {
    value: string;
    label: string;
  }[];
  mode: 'create' | 'edit';
  onChange: (data: ProductBasicSettingsFormDto) => void;
};

export function ProductBasicSettingsForm({
  onChange,
  defaultValues,
  categories,
  mode,
}: Props) {
  const values = useForm<ProductBasicSettingsFormDto>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      isIndexed:
        defaultValues?.isIndexed !== undefined ? defaultValues?.isIndexed : false,
    },
  });

  useEffect(() => {
    values.reset(defaultValues);
  }, [defaultValues]);

  const submit = (data: ProductBasicSettingsFormDto) => onChange(data);

  const change = () => onChange(values.getValues());

  const selectCategory = (newValue: string | number) => {
    values.setValue('categoryKey', newValue.toString());
    change();
  };

  const resetField = (field: keyof ProductBasicSettingsFormDto) => {
    values.setValue(field, undefined);
    change();
  };

  return (
    <FormProvider {...values}>
      <form
        id="productPriceForm"
        onChange={change}
        onSubmit={values.handleSubmit(submit)}
      >
        <Grid container spacing={2}>
          <Grid item md={8} sx={sx.header}>
            <Grid item md>
              <HFTextField name="title" label="Название" />
            </Grid>
            {mode === 'create' && (
              <Grid item md={4}>
                <HFSelect
                  sx={sx.category}
                  label="Категория"
                  options={categories}
                  name="categoryKey"
                  placeholder="Категория"
                  onChange={selectCategory}
                />
              </Grid>
            )}
          </Grid>
          <Grid item md={8} sx={sx.images}>
            <HFUploadPhoto
              sx={sx.imageUpload}
              id="firstImage"
              label="Фото 1"
              name="firstImage"
              onDelete={() => resetField('firstImage')}
            />
            <HFUploadPhoto
              sx={sx.imageUpload}
              id="secondImage"
              label="Фото 2"
              name="secondImage"
              onDelete={() => resetField('secondImage')}
            />
            <HFUploadPhoto
              id="thirdImage"
              label="Фото 3"
              name="thirdImage"
              onDelete={() => resetField('thirdImage')}
            />
          </Grid>

          <Grid item md={8}>
            <HFTextarea label="Описание" name="description" placeholder="Описание" />
          </Grid>

          <Grid item md={8}>
            <FormLabel>Индексация</FormLabel>
            <HFRadioGroup name="isIndexed">
              <FormControlLabel value control={<RadioButton />} label="Да" />
              <FormControlLabel value={false} control={<RadioButton />} label="Нет" />
            </HFRadioGroup>
          </Grid>

          <Grid item md={8}>
            <HFTextField sx={sx.meta} name="metaTitle" label="metaTitle" />
            <HFTextField sx={sx.meta} name="metaDescription" label="metaDescription" />
            <HFTextField name="metaKeywords" label="metaKeywords" />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
