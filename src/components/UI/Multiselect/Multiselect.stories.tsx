import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Multiselect } from './Multiselect';

export default {
  title: 'UI/Multiselect',
  component: Multiselect,
} as ComponentMeta<typeof Multiselect>;

const Template: ComponentStory<typeof Multiselect> = function (args) {
  const [values, setValues] = useState<string[]>([]);
  return <Multiselect {...args} value={values} onChange={setValues} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {
  label: 'Select option',
  value: ['1'],
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
