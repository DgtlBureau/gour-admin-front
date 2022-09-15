import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DeleteCityModal } from './DeleteModal';

export default {
  title: 'Modals/DeleteCity',
  component: DeleteCityModal,
} as ComponentMeta<typeof DeleteCityModal>;

const Template: ComponentStory<typeof DeleteCityModal> = function (args) {
  return <DeleteCityModal {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  isOpen: true,
  cityName: 'Большие Бебры',
};
