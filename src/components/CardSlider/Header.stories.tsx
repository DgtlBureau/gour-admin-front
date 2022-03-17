import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CardSlider } from './CardSlider';

export default {
  title: 'CardSlider',
  component: CardSlider,
} as ComponentMeta<typeof CardSlider>;

const Template: ComponentStory<typeof CardSlider> = function (args) {
  return <CardSlider {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {

};
