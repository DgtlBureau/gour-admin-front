import React, { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, FormLabel, Grid, Radio } from '@mui/material';

import { HFUploadPhoto } from 'components/HookForm/HFUploadPhoto';

import { PagesAboutFormDto } from 'types/dto/form/pages-about.dto';

import { HFRadioGroup } from '../../HookForm/HFRadioGroup';
import { HFTextEditor } from '../../HookForm/HFTextEditor';
import { HFTextField } from '../../HookForm/HFTextField';
import schema from './validation';

type Props = {
  defaultValues?: PagesAboutFormDto;
  withBanner?: boolean;
  onSubmit: SubmitHandler<PagesAboutFormDto>;
};

export function PagesAboutUsForm({ defaultValues, withBanner, onSubmit }: Props) {
  const values = useForm<PagesAboutFormDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues,
  });

  const submit = (data: PagesAboutFormDto) => onSubmit(data);

  const resetField = (field: keyof PagesAboutFormDto) => {
    values.setValue(field, undefined);
  };

  useEffect(() => values.reset(defaultValues), [defaultValues]);

  return (
    <FormProvider {...values}>
      <form id='pagesForm' onSubmit={values.handleSubmit(submit)}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <HFTextField label='Заголовок' name='title' />
          </Grid>

          {withBanner && (
            <Grid item xs={8}>
              <HFUploadPhoto id='bannerImg' label='Баннер' name='bannerImg' onDelete={() => resetField('bannerImg')} />
            </Grid>
          )}

          <Grid item xs={12}>
            <HFTextEditor name='description' />
          </Grid>

          <Grid item xs={8}>
            <FormLabel>Индексация</FormLabel>
            <HFRadioGroup name='isIndexed'>
              <FormControlLabel value control={<Radio />} label='Да' />
              <FormControlLabel value={false} control={<Radio />} label='Нет' />
            </HFRadioGroup>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={4}>
              <HFTextField label='metaTitle' name='metaTitle' />
            </Grid>

            <Grid item xs={4}>
              <HFTextField label='metaDescription' name='metaDescription' />
            </Grid>

            <Grid item xs={4}>
              <HFTextField label='metaKeywords' name='metaKeywords' />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
