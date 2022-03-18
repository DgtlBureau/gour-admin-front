import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, FormLabel, RadioGroup } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { productFormId } from '../BasicSettingsForm/BasicSettingsForm';

import schema from './validationCheese';
import { ProductFilterCheeseFormDto } from '../../../@types/dto/form/product-filters.dto';
import { HFSelect } from '../../HookForm/HFSelect';
import { HFRadioGroup } from '../../HookForm/HFRadioGroup';
import { RadioButton } from '../../UI/RadioButton/RadioButton';

type Props = {
  onSubmit: SubmitHandler<ProductFilterCheeseFormDto>;
};

export function ProductFilterFormCheese({ onSubmit }: Props) {
  const values = useForm<ProductFilterCheeseFormDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      rennet: true,
    },
  });

  const { categories, crustType, milk, timeOfOrigin, country } = {
    categories: ['Свежий', 'Мягкий', 'Полутвёрдый', 'Твёрдый', 'Голубой с плесенью'],
    milk: ['Коровье ', 'Козье', 'Овечье ', 'Смешанный'],
    crustType: ['С белой плесенью ', 'Мытая ', 'Не указано'],
    country: ['россия'],
    timeOfOrigin: [
      'Без выдержки',
      'От 1 месяца',
      'От 3 месяцев',
      'От 6 месяцев',
      'От 1 года',
    ],
  };

  const toSelectOptions = (arr: string[]) => arr.map(c => ({ value: c, label: c }));

  return (
    <FormProvider {...values}>
      <form id={productFormId} onSubmit={values.handleSubmit(onSubmit)}>
        <HFSelect
          placeholder="Категория сыра"
          name="category"
          label="Категория сыра"
          options={toSelectOptions(categories)}
        />

        <HFSelect
          placeholder="Молоко"
          label="Молоко"
          name="milk"
          options={toSelectOptions(milk)}
        />

        <FormLabel>Наличие сычужного фермента</FormLabel>
        <HFRadioGroup name="rennet">
          <FormControlLabel value control={<RadioButton />} label="Да" />
          <FormControlLabel value={false} control={<RadioButton />} label="Нет" />
        </HFRadioGroup>

        <HFSelect
          placeholder="Страна происхождения"
          name="country"
          label="Страна происхождения"
          options={toSelectOptions(country)}
        />

        <HFSelect
          placeholder="Тип корочки"
          name="crustType"
          label="Тип корочки"
          options={toSelectOptions(crustType)}
        />

        <HFSelect
          placeholder="Тип корочки"
          name="timeOfOrigin"
          label="Тип корочки"
          options={toSelectOptions(timeOfOrigin)}
        />
      </form>
    </FormProvider>
  );
}
