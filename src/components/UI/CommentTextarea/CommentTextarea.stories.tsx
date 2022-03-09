import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentTextarea } from './CommentTextarea';

export default {
  title: 'CommentTextarea',
  component: CommentTextarea,
} as ComponentMeta<typeof CommentTextarea>;

const Template: ComponentStory<typeof CommentTextarea> = function (args) {
  return <CommentTextarea {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {
  minRows: 10,
  maxRows: 15,
  placeholder: 'Super text',
  sx: { color: '#333' },
  defaultValue: 'value',
};
