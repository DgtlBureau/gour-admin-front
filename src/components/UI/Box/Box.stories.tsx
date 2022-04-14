import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from './Box';

export default {
  title: 'UI/Box',
  component: Box,
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = function (args) {
  return <Box {...args} />;
};

export const DefaultState = Template.bind({});
// TODO: добавить все варианты отображения
DefaultState.args = {
  children: <>Test</>,
};
