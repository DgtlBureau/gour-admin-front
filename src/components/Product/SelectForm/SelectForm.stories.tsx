import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import { Product, ProductSelectForm, ProductSelectFormProps } from './SelectForm';
import { generateMockId } from '../../../utils/wordHelper';

export default {
  component: ProductSelectForm,
  title: 'Forms/ProductSelect',
} as Meta;

const Template: ComponentStory<typeof ProductSelectForm> = function (
  args: ProductSelectFormProps
) {
  return <ProductSelectForm {...args} />;
};

export const DefaultProductSelectForm = Template.bind({});
const props: Partial<ProductSelectFormProps> = {
  products: [],
  categories: [
    // {
    //   value: generateMockId(),
    //   label: 'Сыры',
    // },
    // {
    //   value: generateMockId(),
    //   label: 'Мясо',
    // },
  ],
};

DefaultProductSelectForm.args = props;
