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
