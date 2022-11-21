import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Switch } from './Switch';

export default {
  title: 'UI/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = args => <Switch {...args} />;

export const DefaultState = Template.bind({});
DefaultState.args = {
  checked: true,
  size: 'small',
  color: 'primary',
  defaultChecked: true,
};
