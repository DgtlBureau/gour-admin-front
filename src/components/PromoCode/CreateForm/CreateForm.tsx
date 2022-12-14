import { RefObject, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';

import { HFDatePicker } from 'components/HookForm/HFDatePicker';
import { HFTextField } from 'components/HookForm/HFTextField';
import { Box } from 'components/UI/Box/Box';
import { Tabs } from 'components/UI/Tabs/Tabs';
import { Typography } from 'components/UI/Typography/Typography';

import { TopLevelCategory } from 'types/entities/Category';

import { CategorySelectForm } from '../CategorySelectForm/CategorySelectForm';
import schema from './validation';

const tabOptions = [
  {
    label: 'Основная информация',
    value: 'settings',
  },
  {
    label: 'Категории',
    value: 'categories',
  },
];

export type PromoCodeCreateFormDto = {
  key: string;
  discount: number;
  end: Date;
  totalCount: number;
  countForOne: number;
  categoryIds: number[];
};

export type PromoCodeCreateFormProps = {
  defaultValues?: PromoCodeCreateFormDto;
  categories: TopLevelCategory[];
  submitBtnRef?: RefObject<HTMLButtonElement>;
  onSave: (data: PromoCodeCreateFormDto) => void;
};

export function CreatePromoCodeForm({ defaultValues, categories, submitBtnRef, onSave }: PromoCodeCreateFormProps) {
  const [selectedTabKey, setSelectedTabKey] = useState(tabOptions[0].value);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[] | undefined>(defaultValues?.categoryIds);
  const [error, setError] = useState<string | null>(null);

  const values = useForm<PromoCodeCreateFormDto>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  useEffect(() => {
    setSelectedCategoryIds(defaultValues?.categoryIds);
    values.reset(defaultValues);
  }, [defaultValues]);

  const changeSelectedCategoryIds = (selected: number[]) => {
    setError(null);
    setSelectedCategoryIds(selected);
  };

  const submit = (dto: PromoCodeCreateFormDto) => {
    if (!selectedCategoryIds?.length) {
      setError('Выберите хотя бы одну категорию');
      return;
    }

    onSave({ ...dto, categoryIds: selectedCategoryIds });
  };

  const settingsFormSx = { display: selectedTabKey === tabOptions[0].value ? 'flex' : 'none' };
  const categorySelectFormSx = { display: selectedTabKey === tabOptions[1].value ? 'flex' : 'none' };

  return (
    <Box>
      <Tabs value={selectedTabKey} options={tabOptions} onChange={setSelectedTabKey} sx={{ marginBottom: '20px' }} />

      {error && (
        <Typography variant='body1' color='error' sx={{ marginBottom: '20px' }}>
          {error}
        </Typography>
      )}

      <Box sx={settingsFormSx}>
        <FormProvider {...values}>
          <form id='promoCodeCreateForm' onSubmit={values.handleSubmit(submit)}>
            <Grid container spacing={2} sx={{ maxWidth: '500px' }}>
              <Grid item xs={12}>
                <HFTextField label='Промокод' name='key' />
              </Grid>

              <Grid item xs={12}>
                <HFTextField label='Скидка %' name='discount' type='number' />
              </Grid>

              <Grid item xs={12}>
                <HFDatePicker name='end' label='Дата завершения' />
              </Grid>

              <Grid item xs={12}>
                <HFTextField label='Общее кол-во' name='totalCount' type='number' />
              </Grid>

              <Grid item xs={12}>
                <HFTextField label='Кол-во для одного' name='countForOne' type='number' />
              </Grid>
            </Grid>

            <button type='submit' ref={submitBtnRef} style={{ display: 'none' }}>
              {}
            </button>
          </form>
        </FormProvider>
      </Box>

      <Box sx={categorySelectFormSx}>
        <CategorySelectForm
          categories={categories}
          selected={selectedCategoryIds}
          onChange={changeSelectedCategoryIds}
        />
      </Box>
    </Box>
  );
}
