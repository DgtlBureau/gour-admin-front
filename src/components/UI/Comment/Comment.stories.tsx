import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { Comment } from './Comment';

export default {
  component: Comment,
  title: 'src/components/UI/Comment',
} as Meta;

const Template: ComponentStory<typeof Comment> = function (args) {
  return <Comment {...args} />;
};
export const DefaultComment = Template.bind({});

DefaultComment.args = {};
