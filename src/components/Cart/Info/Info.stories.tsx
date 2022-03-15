import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CartInfo } from './Info';

export default {
  title: 'CartInfo',
  component: CartInfo,
} as ComponentMeta<typeof CartInfo>;

const Template: ComponentStory<typeof CartInfo> = function (args) {
  return <CartInfo {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {
  count: 3,
  weight: 0.6,
  price: 2230,
  delivery: 500,
  discount: 570,
};
