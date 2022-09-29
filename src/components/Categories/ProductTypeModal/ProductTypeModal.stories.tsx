import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProductTypeModal } from './ProductTypeModal';

export default {
  title: 'Forms/ProductTypeForm',
  component: ProductTypeModal,
} as ComponentMeta<typeof ProductTypeModal>;

const Template: ComponentStory<typeof ProductTypeModal> = function (args) {
  return <ProductTypeModal {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {};
