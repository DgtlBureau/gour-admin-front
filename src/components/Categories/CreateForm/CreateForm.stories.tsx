import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CreateCategoryForm } from './CreateForm';

export default {
  title: 'Forms/CreateCategory',
  component: CreateCategoryForm,
} as ComponentMeta<typeof CreateCategoryForm>;

const Template: ComponentStory<typeof CreateCategoryForm> = function (args) {
  return <CreateCategoryForm {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {};
