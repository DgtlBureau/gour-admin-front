import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { ProductBasicSettingsForm } from './BasicSettingsForm';
import { ProductBasicSettingsFormDto } from '../../../@types/dto/form/product-basic-settings.dto';

export default {
  component: ProductBasicSettingsForm,
  title: 'ProductBasicSettingsForm',
} as Meta;

const defaultValues = {
  categoryKey: 'cheese',
  title: '',
  metaTitle: '',
  metaDescription: '',
  isIndexed: true,
  metaKeywords: '',
} as ProductBasicSettingsFormDto;

const categories = [
  {
    value: 'cheese',
    label: 'Сыр',
  },
  {
    value: 'meat',
    label: 'Мясо',
  },
];

const Template: ComponentStory<typeof ProductBasicSettingsForm> = function (args) {
  return (
    <ProductBasicSettingsForm
      {...args}
      categories={categories}
      defaultValues={defaultValues}
    />
  );
};
export const DefaultBasicSettingsForm = Template.bind({});
