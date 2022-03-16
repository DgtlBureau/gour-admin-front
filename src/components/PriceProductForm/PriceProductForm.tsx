import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import schema from './validation';
import { Button } from '../UI/Button/Button';
import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import { HFTextField } from '../HookForm/HFTextField';
import { HFRadioGroup } from '../HookForm/HFRadioGroup';

const sxDiscount = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
};

const sxPrices = {
  display: 'flex',
};

const sxFields = {
  paddingRight: '20px',
};

const sxInput = {
  maxWidth: '320px',
};

const sxPriceInput = {
  ...sxInput,
  marginBottom: '10px',
};

const sxRadio = {
  marginRight: '20px',
};

const sxTitle = {
  marginBottom: '10px',
};

const discountOptions = [
  {
    label: 'Да',
    value: true,
  },
  {
    label: 'Нет',
    value: false,
  },
];

export type PriceFields = {
  withDiscount: boolean;
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

export type PriceProductFormProps = {
  prices: PriceFields;
  onSubmit: (data: PriceFields) => void;
}

export function PriceProductForm({
  prices,
  onSubmit,
}: PriceProductFormProps) {
  const defaultValues = {
    withDiscount: false,
    discount: prices.discount,

    iRub: prices.iRub,
    iEuro: prices.iEuro,
    iDollar: prices.iDollar,
    iYuan: prices.iYuan,
    iDirhams: prices.iDirhams,

    oRub: prices.oRub,
    oEuro: prices.oEuro,
    oDollar: prices.oDollar,
    oYuan: prices.oYuan,
    oDirhams: prices.oDirhams,

    eRub: prices.eRub,
    eEuro: prices.eEuro,
    eDollar: prices.eDollar,
    eYuan: prices.eYuan,
    eDirhams: prices.eDirhams,
  };

  const [withDiscount, setWithDiscount] = useState(prices.withDiscount);

  const values = useForm<PriceFields>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: PriceFields) => onSubmit(data);

  const changeWithDiscount = (value: string) => setWithDiscount(value === 'true');

  return (
    <FormProvider {...values}>
      <form onSubmit={values.handleSubmit(submitHandler)}>
        <Box sx={sxDiscount}>
          <HFRadioGroup
            sx={sxRadio}
            options={discountOptions}
            label="Скидка на товар"
            name="withDiscount"
            onChange={changeWithDiscount}
          />
          {
            withDiscount && (
              <HFTextField
                sx={sxInput}
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

        <Box sx={sxPrices}>
          <Box sx={sxFields}>
            <Typography variant="body1" sx={sxTitle}>
              Физическое лицо
            </Typography>

            <HFTextField sx={sxPriceInput} label="Цена Рубли" name="iRub" />
            <HFTextField sx={sxPriceInput} label="Цена Евро" name="iEuro" />
            <HFTextField sx={sxPriceInput} label="Цена Доллар" name="iDollar" />
            <HFTextField sx={sxPriceInput} label="Цена Юани" name="iYuan" />
            <HFTextField sx={sxPriceInput} label="Цена Дирхамы" name="iDirhams" />
          </Box>

          <Box sx={sxFields}>
            <Typography variant="body1" sx={sxTitle}>
              Организатор коллективной закупки
            </Typography>

            <HFTextField sx={sxPriceInput} label="Цена Рубли" name="oRub" />
            <HFTextField sx={sxPriceInput} label="Цена Евро" name="oEuro" />
            <HFTextField sx={sxPriceInput} label="Цена Доллар" name="oDollar" />
            <HFTextField sx={sxPriceInput} label="Цена Юани" name="oYuan" />
            <HFTextField sx={sxPriceInput} label="Цена Дирхамы" name="oDirhams" />
          </Box>

          <Box sx={sxFields}>
            <Typography variant="body1" sx={sxTitle}>
              Юридическое лицо
            </Typography>

            <HFTextField sx={sxPriceInput} label="Цена Рубли" name="eRub" />
            <HFTextField sx={sxPriceInput} label="Цена Евро" name="eEuro" />
            <HFTextField sx={sxPriceInput} label="Цена Доллар" name="eDollar" />
            <HFTextField sx={sxPriceInput} label="Цена Юани" name="eYuan" />
            <HFTextField sx={sxPriceInput} label="Цена Дирхамы" name="eDirhams" />
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
