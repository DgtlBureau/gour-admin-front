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
  };

  return <PriceProductForm defaultValues={prices} onChange={submit} />;
};

export const DefaultPriceProductForm = Template.bind({});
