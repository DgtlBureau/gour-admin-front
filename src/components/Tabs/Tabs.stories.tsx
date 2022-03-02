import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tabs } from './Tabs';

export default {
  title: 'Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const OPTIONS = [
  {
    id: 0,
    label: 'Tab 0',
  },
  {
    id: 1,
    label: 'Tab 1',
  },
  {
    id: 2,
    label: 'Tab 2',
  },
  {
    id: 3,
    label: 'Tab 3',
  },
];

const Template: ComponentStory<typeof Tabs> = function () {
  const [selectedId, setSelectedId] = useState(0);

  return (
    <Tabs
      selectedId={selectedId}
      options={OPTIONS}
      onChange={id => setSelectedId(id)}
    />
  );
};

export const DefaultState = Template.bind({});
