import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { generateMockId } from 'utils/wordHelper';

import { ProductSelectForm } from './SelectForm';
import { ProductSelectFormProps } from './types';

export default {
  component: ProductSelectForm,
  title: 'Forms/ProductSelect',
} as Meta;

const Template: ComponentStory<typeof ProductSelectForm> = (args: ProductSelectFormProps) => (
  <ProductSelectForm {...args} />
);

export const DefaultProductSelectForm = Template.bind({});
const props: Partial<ProductSelectFormProps> = {
  products: [],
  categories: [
    {
      id: generateMockId(),
      title: {
        ru: 'Сыры',
        en: 'Сыры',
      },
      parentCategories: [],
      subCategories: [],
    },
    {
      id: generateMockId(),
      title: {
        ru: 'Мясо',
        en: 'Мясо',
      },
      parentCategories: [],
      subCategories: [],
    },
  ],
};

DefaultProductSelectForm.args = props;
