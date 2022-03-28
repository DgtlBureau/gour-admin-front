import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PromotionCard } from './PromotionCard';

export default {
  title: 'PromotionCard',
  component: PromotionCard,
} as ComponentMeta<typeof PromotionCard>;

const Template: ComponentStory<typeof PromotionCard> = function (args) {
  return <PromotionCard {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  title: 'Акция для любителей кушать сыр!',
  image:
    'https://images.unsplash.com/photo-1641642399335-6867075ee7db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
};
