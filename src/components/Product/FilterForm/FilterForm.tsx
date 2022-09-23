import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { MidLevelCategory, TopLevelCategory } from '../../../@types/entities/Category';
import { HFSelect } from '../../HookForm/HFSelect';
import type { SelectOption } from '../../UI/Select/Select';
import { Typography } from '../../UI/Typography/Typography';
import schema from './validation';

type Props = {
  // eslint-disable-next-line react/require-default-props
  defaultValues?: Record<string, number>;
  productTypeId: string | number;
  categories: TopLevelCategory[];
  onChange: (categories: Record<string, number>) => void;
};

type CategoryOptions = { label: string; value: number; options: SelectOption[] };
const formatCategoriesToOptions = (categories: MidLevelCategory[]): CategoryOptions[] =>
  categories.map(category => ({
    label: category.title.ru,
    value: category.id,
    options: category.subCategories.map(sub => ({
      label: sub.title.ru,
      value: sub.id,
    })),
  }));

// eslint-disable-next-line prefer-arrow-callback
export const ProductFilterForm = React.memo(function ProductFilterForm({
  defaultValues,
  productTypeId,
  categories,
  onChange,
}: Props) {
  const values = useForm<Record<string, number>>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues,
  });

  useEffect(() => {
    values.reset(defaultValues);
  }, [defaultValues]);

  const categoriesOptions = useMemo(() => {
    const topCategory = categories.find(category => category.id === +productTypeId);
    if (!topCategory) return [];
    return formatCategoriesToOptions(topCategory.subCategories);
  }, [productTypeId, categories]);

  const handleChange = () => {
    onChange(values.getValues());
  };

  if (!productTypeId) {
    return (
      <Typography>
        Для выбора фильтров укажите категорию товара во вкладке &quot;Основные
        настройки&quot;
      </Typography>
    );
  }

  return (
    <FormProvider {...values}>
      <form
        onBlur={() => {
          handleChange();
        }}
      >
        {categoriesOptions.map(categoryOption => (
          <HFSelect
            key={categoryOption.value}
            placeholder={categoryOption.label}
            name={categoryOption.value.toString()}
            label={categoryOption.label}
            options={categoryOption.options}
            sx={{ marginBottom: '16px' }}
          />
        ))}
      </form>
    </FormProvider>
  );
});
