import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { Comment } from './Comment';

export default {
  component: Comment,
  title: 'Comment',
} as Meta;

const Template: ComponentStory<typeof Comment> = function (args: CommentProps) {
  return (
    <div style={{ background: '#EBEBEB', padding: '20px' }}>
      <Comment {...args} />
    </div>
  );
};
export const DefaultComment = Template.bind({});
const props: Partial<CommentProps> = {
  title: 'Толя Володин',
  grade: 3.7,
  date: '22.02.2022',
  text: 'Я подавился этим сыром и умер, поэтому 3, не очень приятно.',
};

DefaultComment.args = {};
