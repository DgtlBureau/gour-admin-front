import React from 'react';

import { PhotoCamera } from '@mui/icons-material';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { IconButton } from './IconButton';

export default {
  title: 'UI/IconButton',
  component: IconButton,
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = function (args) {
  return <IconButton {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {
  size: 'small',
  children: <PhotoCamera />,
  type: 'button',
  disabled: false,
  color: 'default',
};
