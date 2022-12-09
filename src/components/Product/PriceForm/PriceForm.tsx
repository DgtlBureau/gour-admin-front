import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { ProductPriceFormDto } from 'types/dto/form/product-price.dto';
import { ClientRole } from 'types/entities/ClientRole';

import { HFTextField } from '../../HookForm/HFTextField';
import sx from './PriceForm.styles';
import schema from './validation';

export type PriceProductFormProps = {
  roles: ClientRole[];
  defaultValues: ProductPriceFormDto;
  onChange: (data: ProductPriceFormDto) => void;
};

export function PriceProductForm({ roles, defaultValues, onChange }: PriceProductFormProps) {
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

  const endAdornment = '₽';

  return (
    <FormProvider {...values}>
      <form id='productPriceForm' onSubmit={values.handleSubmit(submitHandler)} onChange={changeHandler}>
        <Box sx={sx.priceFormBox}>
          <HFTextField label='Цена' name='cheeseCoin' endAdornment={endAdornment} />

          <Typography variant='h6' sx={sx.discountsListTitle}>
            Скидки
          </Typography>

          <Grid container spacing={2}>
            {roles.map(role => (
              <Grid item xs={12}>
                <HFTextField label={role.title} name={role.key} endAdornment={endAdornment} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
}
