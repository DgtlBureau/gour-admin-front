import React from 'react';

import { FormControlLabel, FormLabel, Grid, Radio } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../UI/Button/Button';
import { HFTextField } from '../HookForm/HFTextField';
import schema from './validation';
import { HFRadioGroup } from '../HookForm/HFRadioGroup';
import { PagesAboutDto } from '../../@types/dto/form/pages-about.dto';

type Props = {
  defaultValues: PagesAboutDto;
  onSave: SubmitHandler<PagesAboutDto>;
  onCancel: () => void;
};

export function PagesAboutUsForm({ defaultValues, onSave, onCancel }: Props) {
  const values = useForm<PagesAboutDto>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const submitHandler = (data: PagesAboutDto) => {
    onSave(data);
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
            <HFRadioGroup name="indexation">
              <FormControlLabel value="yes" control={<Radio />} label="Да" />
              <FormControlLabel value="no" control={<Radio />} label="Нет" />
            </HFRadioGroup>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={4}>
              <HFTextField label="metaTitle" name="metaTitle" />
            </Grid>
            <Grid item xs={4}>
              <HFTextField label="metaDescriptoin" name="metaDescriptoin" />
            </Grid>
            <Grid item xs={4}>
              <HFTextField label="metaKeywords" name="metaKeywords" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" sx={{ margin: '0 10px 0 0' }}>
              Сохранить
            </Button>
            <Button variant="outlined">Отменить</Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
