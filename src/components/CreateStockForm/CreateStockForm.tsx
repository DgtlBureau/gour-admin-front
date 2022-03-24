import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { CreateStockFormDto } from '../../@types/dto/form/create-stock.dto';
import { HFDatePicker } from '../HookForm/HFDatePicker';
import { HFTextField } from '../HookForm/HFTextField';
import { Button } from '../UI/Button/Button';
import schema from './validation';

type Props = {
  defaultValues: CreateStockFormDto;
  onSubmit: (data: CreateStockFormDto) => void;
  onCancel: () => void;
};

export function CreateStockForm({ defaultValues, onSubmit, onCancel }: Props) {
  const values = useForm<CreateStockFormDto>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const submitHandler = (data: CreateStockFormDto) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submitHandler)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HFTextField name="title" label="Заголовок" />
          </Grid>
          <Grid item xs={12}>
            <HFTextField multiline name="description" label="Описание" />
          </Grid>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={4}>
              <HFDatePicker sx={{ width: '100%' }} name="startDate" label="Дата начала" />
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
          </Grid>
          <Grid item xs={12}>
            <Button sx={{ margin: '0 10px 0 0' }} type="submit">Сохранить</Button>
            <Button type="button" onClick={onCancel}>
              Отмена
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
