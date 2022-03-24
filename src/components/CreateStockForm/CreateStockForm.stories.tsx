import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CreateStockForm } from './CreateStockForm';

export default {
  title: 'CreateStockForm',
  component: CreateStockForm,
} as ComponentMeta<typeof CreateStockForm>;

const Template: ComponentStory<typeof CreateStockForm> = function (args) {
  return <CreateStockForm {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {

};
