import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from './Input';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = function (args) {
  return <Input {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  id: 'input',
  label: 'Super input',
  variant: 'standard',
};
