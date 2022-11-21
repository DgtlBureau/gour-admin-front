import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Select } from './Select';

export default {
  title: 'UI/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = args => <Select {...args} />;

export const DefaultState = Template.bind({});

DefaultState.args = {
  label: 'Select option',
  value: '1',
  options: [
    {
      label: 'Опция 1',
      value: '1',
    },
    {
      label: 'Опция 2',
      value: '2',
    },
    {
      label: 'Опция 3',
      value: '3',
    },
  ],
};
