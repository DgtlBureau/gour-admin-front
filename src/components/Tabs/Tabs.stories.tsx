import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tabs } from './Tabs';

export default {
  title: 'Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const OPTIONS = [
  {
    id: 'tab0',
    label: 'Tab 0',
  },
  {
    id: 'tab1',
    label: 'Tab 1',
  },
  {
    id: 'tab2',
    label: 'Tab 2',
  },
  {
    id: 'tab3',
    label: 'Tab 3',
  },
];

const Template: ComponentStory<typeof Tabs> = function () {
  const [selectedId, setSelectedId] = useState<string>('tab0');

  return (
    <Tabs selectedId={selectedId} options={OPTIONS} onChange={id => setSelectedId(id)} />
  );
};

export const DefaultState = Template.bind({});
