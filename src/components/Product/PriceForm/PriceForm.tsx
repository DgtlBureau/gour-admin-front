import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';

import { Box } from 'components/UI/Box/Box';

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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <HFTextField label='Цена(будет удалено)' name='cheeseCoin' endAdornment={endAdornment} />
            </Grid>
            <Grid item xs={12}>
              <HFTextField label='Физ. лица' name='individual' endAdornment={endAdornment} />
            </Grid>
            <Grid item xs={12}>
              <HFTextField label='Юр. лица нал' name='company' endAdornment={endAdornment} />
            </Grid>
            <Grid item xs={12}>
                <HFTextField label='Юр. лица безнал' name='companyByCash' endAdornment={endAdornment} />
            </Grid>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
}
