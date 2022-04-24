import React from 'react';

import { FormControlLabel, FormLabel, Grid, Radio } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../UI/Button/Button';
import { HFTextField } from '../../HookForm/HFTextField';
import schema from './validation';
import { HFRadioGroup } from '../../HookForm/HFRadioGroup';
import { PagesAboutFormDto } from '../../../@types/dto/form/pages-about.dto';

type Props = {
  defaultValues: PagesAboutFormDto;
  onSubmit: SubmitHandler<PagesAboutFormDto>;
  onCancel: () => void;
};

export function PagesAboutUsForm({ defaultValues, onSubmit, onCancel }: Props) {
  const values = useForm<PagesAboutFormDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      isIndexed: defaultValues?.isIndexed !== undefined ? defaultValues?.isIndexed : true,
    },
  });

  const submitHandler = (data: PagesAboutFormDto) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submitHandler)}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <HFTextField label="Заголовок" name="title" />
          </Grid>
          <Grid item xs={12}>
            <HFTextField label="Описание" name="description" multiline />
          </Grid>
          <Grid item xs={8}>
            <FormLabel>Индексация</FormLabel>
            <HFRadioGroup name="isIndexed">
              <FormControlLabel value control={<Radio />} label="Да" />
              <FormControlLabel value={false} control={<Radio />} label="Нет" />
            </HFRadioGroup>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={4}>
              <HFTextField label="metaTitle" name="metaTitle" />
            </Grid>
            <Grid item xs={4}>
              <HFTextField label="metaDescription" name="metaDescription" />
            </Grid>
            <Grid item xs={4}>
              <HFTextField label="metaKeywords" name="metaKeywords" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" sx={{ margin: '0 10px 0 0' }}>
              Сохранить
            </Button>
            <Button variant="outlined" onClick={onCancel}>
              Отменить
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
