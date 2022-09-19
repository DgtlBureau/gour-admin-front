import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { HFTextField } from '../../HookForm/HFTextField';
import { HFSelect } from '../../HookForm/HFSelect';

import type { CategoryCreateDto } from '../../../@types/dto/category/create.dto';
import type { Category } from '../../../@types/entities/Category';
import schema from './validation';

type Props = {
  defaultValues: CategoryCreateDto;
  categories: {
    label: string;
    value: number;
  }[];
  onSave: SubmitHandler<CategoryCreateDto>;
};

export type CategoryForm = {
  title: string;
  parentCategoryId?: Category['id'];
};

export function CreateCategoryForm({ defaultValues, categories, onSave }: Props) {
  const values = useForm<CategoryForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: defaultValues.title.ru,
      parentCategoryId: defaultValues.parentCategoriesIds?.[0] || -1,
    },
  });

  const handleSave = (data: CategoryForm) => {
    const parentCategoriesIds = data.parentCategoryId
      ? [data.parentCategoryId]
      : undefined;
    onSave({
      title: {
        ru: data.title,
        en: '',
      },
      parentCategoriesIds,
    });
  };

  const categoriesOptions = [{ label: 'Нет', value: -1 }, ...categories];

  return (
    <FormProvider {...values}>
      <form id="createCategoryForm" onSubmit={values.handleSubmit(handleSave)}>
        <HFTextField sx={{ margin: '10px 0' }} label="Название (Рус)" name="title" />
        <HFSelect
          name="parentCategoryId"
          label="Родительская категория"
          placeholder="Родительская категория"
          options={categoriesOptions}
        />
      </form>
    </FormProvider>
  );
}
