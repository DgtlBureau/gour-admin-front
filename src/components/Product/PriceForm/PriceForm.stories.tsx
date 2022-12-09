import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { PriceProductForm, PriceProductFormProps } from './PriceForm';

export default {
  component: PriceProductForm,
  title: 'Forms/PriceProductForm',
} as Meta;

const Template: ComponentStory<typeof PriceProductForm> = function (args: PriceProductFormProps) {
  return <PriceProductForm {...args} />;
};

export const DefaultProductPriceForm = Template.bind({});

DefaultProductPriceForm.args = {
  defaultValues: {
    cheeseCoin: 0,
    companyDiscount: 0,
    collectiveDiscount: 0,
  },
};
