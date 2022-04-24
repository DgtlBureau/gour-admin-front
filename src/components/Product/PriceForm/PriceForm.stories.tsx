import React, { useState } from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { PriceProductFormProps, PriceProductForm } from './PriceForm';
import { ProductPriceFormDto } from '../../../@types/dto/form/product-price.dto';

export default {
  component: PriceProductForm,
  title: 'Forms/PriceProductForm',
} as Meta;

const Template: ComponentStory<typeof PriceProductForm> = function (
  args: PriceProductFormProps
) {
  return <PriceProductForm {...args} />;
};

export const DefaultProductPriceForm = Template.bind({});

DefaultProductPriceForm.args = {
  defaultValues: {
    rub: 0,
    eur: 0,
    companyDiscountRub: 0,
    companyDiscountEur: 0,
    collectiveDiscountRub: 0,
    collectiveDiscountEur: 0,
  },
};
