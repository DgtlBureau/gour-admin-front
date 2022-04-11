import React, { useEffect, useState } from 'react';
import { FormLabel, FormControlLabel, RadioGroup } from '@mui/material';
import { useForm, FormProvider, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import schema from './validation';
import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import { RadioButton } from '../UI/RadioButton/RadioButton';
import { HFTextField } from '../HookForm/HFTextField';
import { ProductPriceFormDto } from '../../@types/dto/form/product-price.dto';

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
  radio: {
    '&.Mui-checked': {
      color: '#25262D',
    },
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
      <form
        id="productPriceForm"
        onSubmit={values.handleSubmit(submitHandler)}
        onChange={changeHandler}
      >
        <Box sx={sx.discount}>
          <RadioGroup sx={sx.radioGroup}>
            <FormLabel>Скидка на товар</FormLabel>
            <Box sx={sx.radios}>
              <FormControlLabel
                label="Да"
                control={(
                  <RadioButton
                    sx={sx.radio}
                    checked={withDiscount}
                    onChange={enableDiscount}
                  />
                )}
              />
              <FormControlLabel
                label="Нет"
                value="false"
                control={(
                  <RadioButton
                    sx={sx.radio}
                    checked={!withDiscount}
                    onChange={disableDiscount}
                  />
                )}
              />
            </Box>
          </RadioGroup>
          {withDiscount && (
            <HFTextField
              sx={sx.input}
              defaultValue={`${defaultValues.discount}`}
              label="Размер скидки"
              name="discount"
            />
          )}
        </Box>

        <Box sx={sx.prices}>
          <Box sx={sx.fields}>
            <Typography variant="body1" sx={sx.title}>
              Физическое лицо
            </Typography>

            <HFTextField sx={sx.priceInput} label="Цена Рубли" name="iRub" />
            <HFTextField sx={sx.priceInput} label="Цена Евро" name="iEuro" />
          </Box>

          <Box sx={sx.fields}>
            <Typography variant="body1" sx={sx.title}>
              Организатор коллективной закупки
            </Typography>

            <HFTextField sx={sx.priceInput} label="Скидка Рубли" name="oRub" />
            <HFTextField sx={sx.priceInput} label="Скидка Евро" name="oEuro" />
          </Box>

          <Box sx={sx.fields}>
            <Typography variant="body1" sx={sx.title}>
              Юридическое лицо
            </Typography>

            <HFTextField sx={sx.priceInput} label="Скидка Рубли" name="eRub" />
            <HFTextField sx={sx.priceInput} label="Скидка Евро" name="eEuro" />
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
