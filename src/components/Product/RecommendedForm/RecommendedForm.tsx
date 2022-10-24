import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from 'components/UI/Box/Box';

import { ProductRecommendedFormDto } from 'types/dto/form/product-recommended.dto';

import { HFTextField } from '../../HookForm/HFTextField';
import schema from './validation';

const boxSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 3,
  padding: '25px',
  borderRadius: '5px',
  width: '300px',
};

type Props = {
  onSubmit: SubmitHandler<ProductRecommendedFormDto>;
  defaultValues?: ProductRecommendedFormDto;
  isLoading?: boolean;
};

export const productFormId = 'product-form';

export function ProductRecommendedForm({ onSubmit, defaultValues }: Props) {
  const values = useForm<ProductRecommendedFormDto>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues,
  });

  const submitHandler = (data: ProductRecommendedFormDto) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...values}>
      <form id={productFormId} onSubmit={values.handleSubmit(submitHandler)}>
        <Box sx={boxSx}>
          <HFTextField name='test' label='test' />
        </Box>
      </form>
    </FormProvider>
  );
}
