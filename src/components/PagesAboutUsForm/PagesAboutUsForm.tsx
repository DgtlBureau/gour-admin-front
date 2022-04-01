import React, { useEffect } from 'react';

import { FormControlLabel, FormLabel, Grid, Radio } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../UI/Button/Button';
import { HFTextField } from '../HookForm/HFTextField';
import schema from './validation';
import { HFRadioGroup } from '../HookForm/HFRadioGroup';
import { PagesAboutFormDto } from '../../@types/dto/form/pages-about.dto';

export type FormDataType = 'main' | 'about' | 'delivery' | 'policy';

type Props = {
  type: FormDataType;
  defaultValues: PagesAboutFormDto;
  onSubmit: (type: FormDataType, data: PagesAboutFormDto) => void;
};

export function PagesAboutUsForm({ defaultValues, type, onSubmit }: Props) {
  const values = useForm<PagesAboutFormDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues,
      isIndexed: defaultValues?.isIndexed !== undefined ? defaultValues?.isIndexed : true,
    },
  });

  const submitHandler = (data: PagesAboutFormDto) => {
    onSubmit(type, data);
  };

  useEffect(() => {
    values.reset(defaultValues);
  }, [defaultValues]);

  const handleCancel = () => {
    values.reset(defaultValues);
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
            <Button variant="outlined" onClick={handleCancel}>
              Отменить
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
