import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DeleteCityModal } from './DeleteModal';

export default {
  title: 'Modals/DeleteCity',
  component: DeleteCityModal,
} as ComponentMeta<typeof DeleteCityModal>;

const Template: ComponentStory<typeof DeleteCityModal> = args => <DeleteCityModal {...args} />;

export const DefaultState = Template.bind({});
DefaultState.args = {
  isOpen: true,
  cityName: 'Большие Бебры',
};
