import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import schema from './validationMeat';
import { ProductFilterMeatFormDto } from '../../../@types/dto/form/product-filters.dto';
import { HFSelect } from '../../HookForm/HFSelect';
import { toSelectOptions } from '../../../utils/toSelectOptions';

type Props = {
  onSubmit: SubmitHandler<ProductFilterMeatFormDto>;
  defaultValues?: ProductFilterMeatFormDto;
};

export function ProductFilterFormMeat({ onSubmit, defaultValues }: Props) {
  const values = useForm<ProductFilterMeatFormDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues,
  });

  const { country, productType, processingType, meatType, timeOfOrigin } = {
    country: ['россия'],
    productType: ['Колбаса', 'Окорок', 'Нарезка', 'Другое'],
    processingType: [
      'Варёное',
      'Горячего копчения',
      'Холодного копчения',
      'Вяленое',
      'Сыровяленое ',
    ],
    meatType: ['Говядина', 'Свинина', 'Овечье', 'Козье', 'Смешанный'],
    timeOfOrigin: [
      'Без выдержки',
      'От 1 месяца',
      'От 3 месяцев',
      'От 6 месяцев',
      'От 1 года',
    ],
  };

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(onSubmit)}>
        <HFSelect
          placeholder="Тип мяса"
          name="meatType"
          label="Тип мяса"
          options={toSelectOptions(meatType)}
        />
        <HFSelect
          placeholder="Тип продукта"
          name="productType"
          options={toSelectOptions(productType)}
          label="Тип продукта"
        />
        <HFSelect
          placeholder="Страна происхождения"
          name="country"
          options={toSelectOptions(country)}
          label="Страна происхождения"
        />
        <HFSelect
          placeholder="Выдержка"
          name="timeOfOrigin"
          options={toSelectOptions(timeOfOrigin)}
          label="Выдержка"
        />
        <HFSelect
          placeholder="Тип обработки"
          name="processingType"
          options={toSelectOptions(processingType)}
          label="Тип обработки"
        />
      </form>
    </FormProvider>
  );
}
