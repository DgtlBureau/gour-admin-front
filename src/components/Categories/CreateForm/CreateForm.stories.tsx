import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CreateCategoryForm } from './CreateForm';

export default {
  title: 'Modals/CreateCategory',
  component: CreateCategoryForm,
} as ComponentMeta<typeof CreateCategoryForm>;

const Template: ComponentStory<typeof CreateCategoryForm> = function (args) {
  return <CreateCategoryForm {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  defaultValues: {
    title: {
      ru: 'Тест',
      en: '',
    },
    parentCategoriesIds: [],
    subCategoriesIds: [],
  },
  categories: [
    {
      label: 'Сыр',
      value: 1,
    },
    {
      label: 'Молоко',
      value: 2,
    },
    {
      label: 'Мясо',
      value: 3,
    },
  ],
};
