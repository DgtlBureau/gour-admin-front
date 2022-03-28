import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ProductSelectForm, ProductSelectFormProps } from './ProductSelectForm';

export default {
  component: ProductSelectForm,
  title: 'src/components/ProductSelectForm',
} as Meta;

const Template: ComponentStory<typeof ProductSelectForm> = function (
  args: ProductSelectFormProps
) {
  return <ProductSelectForm {...args} />;
};

export const DefaultProductSelectForm = Template.bind({});
const props: Partial<ProductSelectFormProps> = {};

DefaultProductSelectForm.args = props;
