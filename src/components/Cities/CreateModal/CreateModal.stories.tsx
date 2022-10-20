import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CreateCityModal } from './CreateModal';

export default {
  title: 'Modals/CreateCity',
  component: CreateCityModal,
} as ComponentMeta<typeof CreateCityModal>;

const Template: ComponentStory<typeof CreateCityModal> = function (args) {
  return <CreateCityModal {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  defaultValues: { engName: 'Moscow', rusName: 'Москва' },
};
