import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CreateCities } from './Create';

export default {
  title: 'Box',
  component: CreateCities,
} as ComponentMeta<typeof CreateCities>;

const Template: ComponentStory<typeof CreateCities> = function (args) {
  return <CreateCities {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {};
