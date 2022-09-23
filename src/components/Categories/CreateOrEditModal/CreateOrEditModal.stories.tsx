import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CreateOrEditModalCategoryModal } from './CreateOrEditModal';

export default {
  title: 'Modals/CreateCategory',
  component: CreateOrEditModalCategoryModal,
} as ComponentMeta<typeof CreateOrEditModalCategoryModal>;

const Template: ComponentStory<typeof CreateOrEditModalCategoryModal> = function (args) {
  return <CreateOrEditModalCategoryModal {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  isOpen: true,
  currentCategory: {
    id: 100,
    title: {
      ru: 'Страна',
      en: '',
    },
    parentCategories: null,
    subCategories: [
      {
        id: 1,
        title: {
          ru: 'Россия',
          en: '',
        },
        parentCategories: null,
        subCategories: null,
      },
      {
        id: 2,
        title: {
          ru: 'Франция',
          en: '',
        },
        parentCategories: null,
        subCategories: null,
      },
    ],
  },
};
