import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Checkbox } from './Checkbox';

export default {
  title: 'UI/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = function (args) {
  return <Checkbox {...args} />;
};

export const DefaultState = Template.bind({});
export const CheckboxLabel = Template.bind({});

DefaultState.args = {
  defaultChecked: false,
  disabled: false,
  checked: false,
};

CheckboxLabel.args = {
  defaultChecked: false,
  disabled: false,
  checked: false,
  label: 'label',
};
