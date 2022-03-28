import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { FormControlLabel, FormLabel, Radio, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../../UI/Button/Button';
import { HFTextField } from '../../HookForm/HFTextField';
import { HFSelect } from '../../HookForm/HFSelect';
import { HFTextarea } from '../../HookForm/HFTextarea';
import { HFRadioGroup } from '../../HookForm/HFRadioGroup';
import { ProductBasicSettingsFormDto } from '../../../@types/dto/form/product-basic-settings.dto';
import schema from './validation';

const sx = {
  input: {
    marginTop: '10px',
  },
  radioGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  radios: {
    marginLeft: '30px',
  },
};

type Props = {
  onSubmit: SubmitHandler<ProductBasicSettingsFormDto>;
  defaultValues?: ProductBasicSettingsFormDto;
  isLoading?: boolean;
};

export function ProductBasicSettingsForm({ onSubmit, defaultValues }: Props) {
  const values = useForm<ProductBasicSettingsFormDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      ...defaultValues,
      isIndexed: defaultValues?.isIndexed !== undefined ? defaultValues?.isIndexed : true,
    },
  });

  const submitHandler = (data: ProductBasicSettingsFormDto) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submitHandler)}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <HFTextField name="title" label="Название" sx={sx.input} />
          </Grid>

          <Grid item xs={4}>
            <HFSelect
              options={[
                { value: 'cheese', label: 'Cыр' },
                { value: 'meat', label: 'Mясо' },
              ]}
              name="category"
              placeholder="Сыр"
            />
          </Grid>

          <Grid item xs={8}>
            <HFTextarea
              name="description"
              placeholder="Введите описание"
            />
          </Grid>

          <Grid item xs={12} sx={sx.radioGroup}>
            <FormLabel>Индексация</FormLabel>
            <HFRadioGroup name="isIndexed" sx={sx.radios}>
              <FormControlLabel value control={<Radio />} label="Да" />
              <FormControlLabel value={false} control={<Radio />} label="Нет" />
            </HFRadioGroup>
          </Grid>

          <Grid container item xs={4}>
            {
              ['metaTitle', 'metaDescription', 'metaKeywords'].map(field => (
                <Grid key={field} item xs={12}>
                  <HFTextField name={field} label={field} sx={sx.input} />
                </Grid>
              ))
            }
          </Grid>

          {/* delete later */}
          <Grid item xs={12}>
            <Button type="submit">
              Сохранить
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
