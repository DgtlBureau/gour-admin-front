import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { Comment, CommentProps } from './Comment';

export default {
  component: Comment,
  title: 'src/components/UI/Comment',
} as Meta;

const Template: ComponentStory<typeof Comment> = function (args: CommentProps) {
  return <Comment {...args} />;
};
export const DefaultComment = Template.bind({});
const props: Partial<CommentProps> = {};

DefaultComment.args = props;
