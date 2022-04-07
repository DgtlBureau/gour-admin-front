import React, { FormEvent, FormEventHandler, useEffect } from 'react';
import { useForm, FormProvider, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, FormLabel, Grid } from '@mui/material';
import { HFTextField } from '../../HookForm/HFTextField';
import { HFSelect } from '../../HookForm/HFSelect';
import { HFTextarea } from '../../HookForm/HFTextarea';
import schema from './validation';
import { ProductBasicSettingsFormDto } from '../../../@types/dto/form/product-basic-settings.dto';
import { RadioButton } from '../../UI/RadioButton/RadioButton';
import { HFRadioGroup } from '../../HookForm/HFRadioGroup';
import { useGetAllCategoriesQuery } from '../../../api/categoryApi';

type Props = {
  defaultValues?: ProductBasicSettingsFormDto;
  isLoading?: boolean;
  onError: (errors: Record<string, FieldError | undefined>) => void;
  onChange: (data: ProductBasicSettingsFormDto) => void;
};

export function ProductBasicSettingsForm({ onChange, onError, defaultValues }: Props) {
  const values = useForm<ProductBasicSettingsFormDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      isIndexed: defaultValues?.isIndexed !== undefined ? defaultValues?.isIndexed : true,
    },
  });

  useEffect(() => {
    values.reset(defaultValues);
  }, [defaultValues]);

  const submitHandler = (data: ProductBasicSettingsFormDto) => {
    onChange(data);
  };

  useEffect(() => {
    onError(values.formState.errors);
  }, [values.formState.errors]);

  const changeHandler = () => {
    onChange(values.getValues());
  };

  const { data: categories = [] } = useGetAllCategoriesQuery();

  const selectCategoryOptions = categories.map(category => ({
    value: category.id,
    label: category.title.ru,
  }));

  return (
    <FormProvider {...values}>
      <form
        id="productPriceForm"
        onChange={changeHandler}
        onSubmit={values.handleSubmit(submitHandler)}
      >
        <Grid container spacing={2}>
          <Grid item md={8}>
            <HFTextField name="title" label="Название" />
          </Grid>
          <Grid item md={4}>
            <HFSelect
              options={selectCategoryOptions}
              name="category"
              placeholder="Категория"
            />
          </Grid>
          <Grid item md={12}>
            <HFTextarea name="description" placeholder="Описание" />
          </Grid>
          <Grid item md={12}>
            <FormLabel>Индексация</FormLabel>
            <HFRadioGroup name="isIndexed">
              <FormControlLabel value control={<RadioButton />} label="Да" />
              <FormControlLabel value={false} control={<RadioButton />} label="Нет" />
            </HFRadioGroup>
          </Grid>
          <Grid item md={6}>
            <HFTextField name="metaTitle" label="metaTitle" />
          </Grid>
          <Grid item md={6}>
            <HFTextField name="metaDescription" label="metaDescription" />
          </Grid>
          <Grid item md={6}>
            <HFTextField name="metaKeywords" label="metaKeywords" />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
