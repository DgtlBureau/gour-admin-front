import React, { useState } from 'react';
import { FormControlLabel, RadioGroup } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import schema from './validation';
import { Box } from '../../UI/Box/Box';
import { Button } from '../../UI/Button/Button';
import { Typography } from '../../UI/Typography/Typography';
import { RadioButton } from '../../UI/RadioButton/RadioButton';
import { HFTextField } from '../../HookForm/HFTextField';

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

export type PriceFields = {
  discount?: string;

  iRub: string;
  iEuro: string;
  iDollar: string;
  iYuan: string;
  iDirhams: string;

  oRub: string;
  oEuro: string;
  oDollar: string;
  oYuan: string;
  oDirhams: string;

  eRub: string;
  eEuro: string;
  eDollar: string;
  eYuan: string;
  eDirhams: string;
}

export type ProductPriceFormProps = {
  prices: PriceFields;
  onSubmit: (data: PriceFields) => void;
}

export function ProductPriceForm({
  prices,
  onSubmit,
}: ProductPriceFormProps) {
  const [withDiscount, setWithDiscount] = useState(!!prices.discount);

  const values = useForm<PriceFields>({
    defaultValues: prices,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: PriceFields) => onSubmit(data);

  const enableDiscount = () => setWithDiscount(true);
  const disableDiscount = () => setWithDiscount(false);

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submitHandler)}>
        <Box sx={sx.discount}>
          <RadioGroup sx={sx.radioGroup}>
            <Typography variant="body1" color="primary">Скидка на товар</Typography>
            <Box sx={sx.radios}>
              <FormControlLabel
                label="Да"
                value="true"
                control={(
                  <RadioButton
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
                    checked={!withDiscount}
                    onChange={disableDiscount}
                  />
                )}
              />
            </Box>
          </RadioGroup>
          {
            withDiscount && (
              <HFTextField
                sx={sx.input}
                defaultValue={prices.discount}
                label="Размер скидки"
                name="discount"
              />
            )
          }
          {/* delete later */}
          <Button variant="text" type="submit" sx={{ marginLeft: '20px', height: '28px' }}>
            Сохранить
          </Button>
        </Box>

        <Box sx={sx.prices}>
          <Box sx={sx.fields}>
            <Typography variant="body1" sx={sx.title}>
              Физическое лицо
            </Typography>

            <HFTextField sx={sx.priceInput} label="Цена Рубли" name="iRub" />
            <HFTextField sx={sx.priceInput} label="Цена Евро" name="iEuro" />
            <HFTextField sx={sx.priceInput} label="Цена Доллар" name="iDollar" />
            <HFTextField sx={sx.priceInput} label="Цена Юани" name="iYuan" />
            <HFTextField sx={sx.priceInput} label="Цена Дирхамы" name="iDirhams" />
          </Box>

          <Box sx={sx.fields}>
            <Typography variant="body1" sx={sx.title}>
              Организатор коллективной закупки
            </Typography>

            <HFTextField sx={sx.priceInput} label="Цена Рубли" name="oRub" />
            <HFTextField sx={sx.priceInput} label="Цена Евро" name="oEuro" />
            <HFTextField sx={sx.priceInput} label="Цена Доллар" name="oDollar" />
            <HFTextField sx={sx.priceInput} label="Цена Юани" name="oYuan" />
            <HFTextField sx={sx.priceInput} label="Цена Дирхамы" name="oDirhams" />
          </Box>

          <Box sx={sx.fields}>
            <Typography variant="body1" sx={sx.title}>
              Юридическое лицо
            </Typography>

            <HFTextField sx={sx.priceInput} label="Цена Рубли" name="eRub" />
            <HFTextField sx={sx.priceInput} label="Цена Евро" name="eEuro" />
            <HFTextField sx={sx.priceInput} label="Цена Доллар" name="eDollar" />
            <HFTextField sx={sx.priceInput} label="Цена Юани" name="eYuan" />
            <HFTextField sx={sx.priceInput} label="Цена Дирхамы" name="eDirhams" />
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
