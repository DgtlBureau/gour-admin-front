import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Textarea } from './Textarea';

export default {
  title: 'Textarea',
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = function (args) {
  return <Textarea {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {};
