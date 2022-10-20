import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TextField } from './TextField';

export default {
  title: 'UI/TextField',
  component: TextField,
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = function (args) {
  return <TextField {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  id: 'input',
  label: 'Super input',
  variant: 'standard',
};
