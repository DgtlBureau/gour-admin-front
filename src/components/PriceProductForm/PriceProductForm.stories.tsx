import React, { useState } from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { PriceProductForm, PriceFields } from './PriceProductForm';

export default {
  component: PriceProductForm,
  title: 'PriceProductForm',
} as Meta;

const Template: ComponentStory<typeof PriceProductForm> = function () {
  const [prices, setPrices] = useState({} as PriceFields);

  const submit = (data: PriceFields) => {
    setPrices(data);
    console.log(data);
  };

  return (
    <PriceProductForm prices={prices} onSubmit={submit} />
  );
};

export const DefaultPriceProductForm = Template.bind({});
