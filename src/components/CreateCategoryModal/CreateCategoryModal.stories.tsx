import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CreateCategoryModal } from './CreateCategoryModal';

export default {
  title: 'CreateCategoryModal',
  component: CreateCategoryModal,
} as ComponentMeta<typeof CreateCategoryModal>;

const Template: ComponentStory<typeof CreateCategoryModal> = function (args) {
  return <CreateCategoryModal {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  defaultValues: { ru: 'Сыр', en: 'Cheese' },
};
