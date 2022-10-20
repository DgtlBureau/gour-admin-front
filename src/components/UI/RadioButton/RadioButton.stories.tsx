import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { RadioButton } from './RadioButton';

export default {
  title: 'UI/RadioButton',
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>;

const Template: ComponentStory<typeof RadioButton> = function (args) {
  return <RadioButton {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  checked: true,
  size: 'small',
  color: 'primary',
  defaultChecked: true,
};
