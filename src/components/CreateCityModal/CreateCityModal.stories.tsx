import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CreateCityModal } from './CreateCityModal';

export default {
  title: 'CreateCityModal',
  component: CreateCityModal,
} as ComponentMeta<typeof CreateCityModal>;

const Template: ComponentStory<typeof CreateCityModal> = function (args) {
  return <CreateCityModal {...args} />;
};

export const DefaultState = Template.bind({});
// TODO: добавить все варианты отображения
DefaultState.args = {
  engName: 'Moscow',
  rusName: 'Москва',
};
