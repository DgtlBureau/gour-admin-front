import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProgressLinear } from './ProgressLinear';

export default {
  title: 'UI/ProgressLinear',
  component: ProgressLinear,
} as ComponentMeta<typeof ProgressLinear>;

const Template: ComponentStory<typeof ProgressLinear> = function (args) {
  return <ProgressLinear {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  color: 'primary',
  value: 150,
  valueBuffer: 57,
  variant: 'determinate',
};
