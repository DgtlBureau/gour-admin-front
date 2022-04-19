import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import schema from './validation';
import { TranslatableStringDto } from '../../../@types/dto/translatable-string.dto';
import { HFTextField } from '../../HookForm/HFTextField';

type Props = {
  defaultValues: TranslatableStringDto;
  onSave: SubmitHandler<TranslatableStringDto>;
};

export function CreateCategoryForm({ defaultValues, onSave }: Props) {
  const values = useForm<TranslatableStringDto>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const submit = (data: TranslatableStringDto) => onSave(data);

  return (
    <FormProvider {...values}>
      <form id="createCategoryForm" onSubmit={values.handleSubmit(submit)}>
        <HFTextField sx={{ margin: '10px 0' }} label="Название (Рус)" name="ru" />
        <HFTextField label="Название (Eng)" name="en" />
      </form>
    </FormProvider>
  );
}
