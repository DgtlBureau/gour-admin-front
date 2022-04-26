import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, FormLabel } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import schema from './validationCheese';
import { ProductFilterCheeseFormDto } from '../../../@types/dto/form/product-filters.dto';
import { HFSelect } from '../../HookForm/HFSelect';
import { HFRadioGroup } from '../../HookForm/HFRadioGroup';
import { RadioButton } from '../../UI/RadioButton/RadioButton';
import { toSelectOptions } from '../../../utils/toSelectOptions';
import {
  CHEESE_CHARACTERISTICS,
  COMMON_CHARACTERISTICS,
} from '../../../constants/characteristics';

type Props = {
  onChange: (data: ProductFilterCheeseFormDto, type: 'cheese') => void;
  defaultValues?: ProductFilterCheeseFormDto;
};

export function ProductFilterFormCheese({ onChange, defaultValues }: Props) {
  const values = useForm<ProductFilterCheeseFormDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      ...defaultValues,
      rennet: defaultValues?.rennet !== undefined ? defaultValues.rennet : true,
    },
  });

  useEffect(() => {
    values.reset(defaultValues);
  }, [defaultValues]);

  const handleChange = () => {
    onChange(values.getValues(), 'cheese');
  };

  const allCharacteristics = { ...COMMON_CHARACTERISTICS, ...CHEESE_CHARACTERISTICS };

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
