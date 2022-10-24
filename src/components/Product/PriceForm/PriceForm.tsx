import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, RadioGroup } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { RadioButton } from 'components/UI/RadioButton/RadioButton';
import { Typography } from 'components/UI/Typography/Typography';

import { ProductPriceFormDto } from 'types/dto/form/product-price.dto';

import { HFTextField } from '../../HookForm/HFTextField';
import schema from './validation';

const sx = {
  discount: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  prices: {
    display: 'flex',
  },
  fields: {
    paddingRight: '20px',
  },
  input: {
    maxWidth: '320px',
  },
  priceInput: {
    maxWidth: '320px',
    marginBottom: '10px',
  },
  radioGroup: {
    marginRight: '20px',
  },
  radios: {
    display: 'flex',
  },
  title: {
    marginBottom: '10px',
  },
};

export type PriceProductFormProps = {
  defaultValues: ProductPriceFormDto;
  onChange: (data: ProductPriceFormDto) => void;
};

export function PriceProductForm({ defaultValues, onChange }: PriceProductFormProps) {
  const [withDiscount, setWithDiscount] = useState(!!defaultValues.discount);
  const values = useForm<ProductPriceFormDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues,
  });

  useEffect(() => {
    values.reset(defaultValues);
  }, [defaultValues]);

  const changeHandler = () => {
    onChange(values.getValues());
  };

  const submitHandler = (data: ProductPriceFormDto) => {
    onChange(data);
  };

  const enableDiscount = () => setWithDiscount(true);
  const disableDiscount = () => setWithDiscount(false);

  return (
    <FormProvider {...values}>
      <form id='productPriceForm' onSubmit={values.handleSubmit(submitHandler)} onChange={changeHandler}>
        <Box sx={sx.discount}>
          <RadioGroup sx={sx.radioGroup}>
            <Typography variant='body1' color='primary'>
              Скидка на товар
            </Typography>
            <Box sx={sx.radios}>
              <FormControlLabel
                label='Да'
                value='true'
                control={<RadioButton checked={withDiscount} onChange={enableDiscount} />}
              />
              <FormControlLabel
                label='Нет'
                value='false'
                control={<RadioButton checked={!withDiscount} onChange={disableDiscount} />}
              />
            </Box>
          </RadioGroup>
          {withDiscount && (
            <HFTextField
              sx={sx.input}
              defaultValue={`${defaultValues.discount || 0}`}
              label='Размер скидки %'
              name='discount'
            />
          )}
        </Box>

        <Box sx={sx.prices}>
          <Box sx={sx.fields}>
            <Typography variant='body1' sx={sx.title}>
              Физическое лицо
            </Typography>

            <HFTextField sx={sx.priceInput} label='Цена CheeseCoin' name='cheeseCoin' />
          </Box>

          <Box sx={sx.fields}>
            <Typography variant='body1' sx={sx.title}>
              Организатор коллективной закупки
            </Typography>

            <HFTextField sx={sx.priceInput} label='Скидка CheeseCoin' name='companyDiscount' />
          </Box>

          <Box sx={sx.fields}>
            <Typography variant='body1' sx={sx.title}>
              Юридическое лицо
            </Typography>

            <HFTextField sx={sx.priceInput} label='Скидка CheeseCoin' name='collectiveDiscount' />
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
