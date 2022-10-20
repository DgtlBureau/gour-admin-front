import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Typography } from './Typography';

export default {
  title: 'UI/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = function (args) {
  return <Typography {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {
  variant: 'h1',
};
