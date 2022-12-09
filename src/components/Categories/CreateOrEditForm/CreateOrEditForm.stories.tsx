import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CreateOrEditCategoryForm } from './CreateOrEditForm';

export default {
  title: 'Forms/CategoryForm',
  component: CreateOrEditCategoryForm,
} as ComponentMeta<typeof CreateOrEditCategoryForm>;

const Template: ComponentStory<typeof CreateOrEditCategoryForm> = args => <CreateOrEditCategoryForm {...args} />;

export const DefaultState = Template.bind({});
DefaultState.args = {};
