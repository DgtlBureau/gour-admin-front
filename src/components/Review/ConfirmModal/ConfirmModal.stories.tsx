import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ConfirmReviewModal } from './ConfirmModal';

export default {
  title: 'Modals/ConfirmReview',
  component: ConfirmReviewModal,
} as ComponentMeta<typeof ConfirmReviewModal>;

const Template: ComponentStory<typeof ConfirmReviewModal> = function (args) {
  return <ConfirmReviewModal {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  comment: {
    authorName: 'test',
    text: 'test',
    productName: 'test',
    date: '27.12.2001',
  },
  isOpen: false,
};
