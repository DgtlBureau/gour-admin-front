import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CodeInput } from './CodeInput';

export default {
  title: 'UI/CodeInput',
  component: CodeInput,
} as ComponentMeta<typeof CodeInput>;

const Template: ComponentStory<typeof CodeInput> = args => <CodeInput {...args} />;

export const DefaultState = Template.bind({});

DefaultState.args = {};
