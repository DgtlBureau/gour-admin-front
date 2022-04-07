import React, { useState } from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { FieldError } from 'react-hook-form';
import { PriceProductForm } from './PriceProductForm';
import { ProductPriceFormDto } from '../../@types/dto/form/product-price.dto';

export default {
  component: PriceProductForm,
  title: 'PriceProductForm',
} as Meta;

const Template: ComponentStory<typeof PriceProductForm> = function () {
  const [prices, setPrices] = useState({} as ProductPriceFormDto);

  const submit = (data: ProductPriceFormDto) => {
    setPrices(data);
    console.log(data);
  };
  const handleError = (errors: Record<string, FieldError | undefined>) => console.log(errors);

  return (
    <PriceProductForm onError={handleError} defaultValues={prices} onChange={submit} />
  );
};

export const DefaultPriceProductForm = Template.bind({});
