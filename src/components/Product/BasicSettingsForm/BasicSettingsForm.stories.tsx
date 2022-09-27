import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { ProductBasicSettingsForm } from './BasicSettingsForm';
import { ProductBasicSettingsFormDto } from '../../../@types/dto/form/product-basic-settings.dto';
import { generateMockId } from '../../../utils/wordHelper';

export default {
  component: ProductBasicSettingsForm,
  title: 'Forms/ProductBasicSettings',
} as Meta;

const defaultValues = {
  productType: null, // FIXME:
  title: '',
  metaTitle: '',
  metaDescription: '',
  isIndexed: true,
  metaKeywords: '',
} as ProductBasicSettingsFormDto;

const categories = [
  {
    value: generateMockId(),
    label: 'Сыр',
  },
  {
    value: generateMockId(),
    label: 'Мясо',
  },
];

const Template: ComponentStory<typeof ProductBasicSettingsForm> = function (args) {
  return (
    <ProductBasicSettingsForm
      {...args}
      productTypes={categories}
      defaultValues={defaultValues}
      mode="create"
    />
  );
};
export const DefaultBasicSettingsForm = Template.bind({});
