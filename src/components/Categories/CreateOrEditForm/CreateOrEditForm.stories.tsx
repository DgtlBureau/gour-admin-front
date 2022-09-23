import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CreateOrEditCategoryForm } from './CreateOrEditForm';

export default {
  title: 'Forms/CategoryForm',
  component: CreateOrEditCategoryForm,
} as ComponentMeta<typeof CreateOrEditCategoryForm>;

const Template: ComponentStory<typeof CreateOrEditCategoryForm> = function (args) {
  return <CreateOrEditCategoryForm {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {};
