import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'UI/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const DefaultState = Template.bind({});
// TODO: добавить все варианты отображения
DefaultState.args = {
  variant: 'text',
  children: <div>Super Button</div>,
  type: 'button',
  disabled: false,
};
