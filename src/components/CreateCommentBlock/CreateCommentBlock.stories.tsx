import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CreateCommentBlock } from './CreateCommentBlock';

export default {
  title: 'CreateCommentBlock',
  component: CreateCommentBlock,
} as ComponentMeta<typeof CreateCommentBlock>;

const Template: ComponentStory<typeof CreateCommentBlock> = function (args) {
  return <CreateCommentBlock {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {};
