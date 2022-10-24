import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ProductTypeModal } from './ProductTypeModal';

export default {
  title: 'Forms/ProductTypeForm',
  component: ProductTypeModal,
} as ComponentMeta<typeof ProductTypeModal>;

const Template: ComponentStory<typeof ProductTypeModal> = args => <ProductTypeModal {...args} />;

export const DefaultState = Template.bind({});
DefaultState.args = {};
