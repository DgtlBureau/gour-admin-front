import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Switch } from './Switch';

export default {
  title: 'Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = function (args) {
  return <Switch {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  checked: true,
  size: 'small',
  color: 'primary',
  defaultChecked: true,
  onChange: (event, checked) => console.log(checked, event),
};
