import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CodeInput } from './CodeInput';

export default {
  title: 'UI/CodeInput',
  component: CodeInput,
} as ComponentMeta<typeof CodeInput>;

const Template: ComponentStory<typeof CodeInput> = function (args) {
  return <CodeInput {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {};
