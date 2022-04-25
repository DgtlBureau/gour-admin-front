import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CreateCategoryModal } from './CreateModal';

export default {
  title: 'Modals/CreateCategory',
  component: CreateCategoryModal,
} as ComponentMeta<typeof CreateCategoryModal>;

const Template: ComponentStory<typeof CreateCategoryModal> = function (args) {
  return <CreateCategoryModal {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {};
