import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProgressCircular } from './ProgressCircular';

export default {
  title: 'ProgressCircular',
  component: ProgressCircular,
} as ComponentMeta<typeof ProgressCircular>;

const Template: ComponentStory<typeof ProgressCircular> = function (args) {
  return <ProgressCircular {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  color: 'primary',
  size: 149,
  disableShrink: true,
  thickness: 3,
  value: 1,
  variant: 'determinate',
};
