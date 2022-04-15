import React, { useState } from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { ProductPriceForm, PriceFields } from './PriceForm';

export default {
  component: ProductPriceForm,
  title: 'Forms/PriceProduct',
} as Meta;

const Template: ComponentStory<typeof ProductPriceForm> = function () {
  const [prices, setPrices] = useState({} as PriceFields);

  const submit = (data: PriceFields) => {
    setPrices(data);
    console.log(data);
  };

  return (
    <ProductPriceForm prices={prices} onSubmit={submit} />
  );
};

export const DefaultProductPriceForm = Template.bind({});
