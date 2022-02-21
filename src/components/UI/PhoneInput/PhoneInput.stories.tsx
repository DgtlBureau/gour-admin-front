import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PhoneInput } from './PhoneInput';

export default {
  title: 'PhoneInput',
  component: PhoneInput,
} as ComponentMeta<typeof PhoneInput>;

const Template: ComponentStory<typeof PhoneInput> = function (args) {
  return <PhoneInput {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {};
