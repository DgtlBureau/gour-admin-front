import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { ProductBasicSettingsForm } from './BasicSettingsForm';
import { ProductBasicSettingsFormDto } from '../../../@types/dto/form/product-basic-settings.dto';

export default {
  component: ProductBasicSettingsForm,
  title: 'ProductBasicSettingsForm',
} as Meta;

const defaultValues = {
  category: 'cheese',
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

const Template: ComponentStory<typeof ProductBasicSettingsForm> = function () {
  return (
    <ProductBasicSettingsForm
      categories={categories}
      defaultValues={defaultValues}
      onSubmit={data => console.log(data)}
    />
  );
};
export const DefaultBasicSettingsForm = Template.bind({});
