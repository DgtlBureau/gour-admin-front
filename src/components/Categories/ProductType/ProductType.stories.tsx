import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CategoryProductType } from './ProductType';

export default {
  title: 'ProductType',
  component: CategoryProductType,
} as ComponentMeta<typeof CategoryProductType>;

const Template: ComponentStory<typeof CategoryProductType> = args => <CategoryProductType {...args} />;

export const DefaultState = Template.bind({});
DefaultState.args = {
  productType: {
    id: 1,
    title: {
      ru: 'Сыр',
      en: '',
    },
    subCategories: [
      {
        id: 100,
        title: {
          ru: 'Страна',
          en: '',
        },
        parentCategories: null,
        subCategories: [],
      },
      {
        id: 100,
        title: {
          ru: 'Молоко',
          en: '',
        },
        parentCategories: null,
        subCategories: [],
      },
    ],
    parentCategories: [],
  },
};
