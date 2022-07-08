import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import schema from './validationMeat';
import { ProductFilterMeatFormDto } from '../../../@types/dto/form/product-filters.dto';
import { HFSelect } from '../../HookForm/HFSelect';
import { toSelectOptions } from '../../../utils/toSelectOptions';
import {
  COMMON_CHARACTERISTICS,
  MEAT_CHARACTERISTICS,
} from '../../../constants/characteristics';

type Props = {
  onChange: (data: ProductFilterMeatFormDto, type: 'meat') => void;
  defaultValues?: ProductFilterMeatFormDto;
};

export function ProductFilterFormMeat({ onChange, defaultValues }: Props) {
  const values = useForm<ProductFilterMeatFormDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues,
  });

  useEffect(() => {
    values.reset(defaultValues);
  }, [defaultValues]);

  const handleChange = () => {
    onChange(values.getValues(), 'meat');
  };

  const allCharacteristics = { ...COMMON_CHARACTERISTICS, ...MEAT_CHARACTERISTICS };

  return (
    <FormProvider {...values}>
      <form
        onBlur={() => {
          handleChange();
        }}
      >
        {Object.keys(allCharacteristics).map(key => {
          const characteristic = allCharacteristics[key];
          const optionValues = characteristic.values.map(value => ({
            value: value.key,
            label: value.label.ru,
          }));
          return (
            <HFSelect
              key={key}
              placeholder={characteristic.label.ru}
              name={key}
              label={characteristic.label.ru}
              options={optionValues}
            />
          );
        })}
      </form>
    </FormProvider>
  );
}
