import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select } from './Select';

export default {
  title: 'Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = function (args) {
  return <Select {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  id: 'select',
  label: 'Select option',
  items: [
    {
      label: 'Опция 1',
      value: 'option 1',
    },
    {
      label: 'Опция 2',
      value: 'option 2',
    },
    {
      label: 'Опция 3',
      value: 'option 3',
    },
  ],
  sx: { width: 150 },
};
