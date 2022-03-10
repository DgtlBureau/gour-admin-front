import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ProductInformation, ProductInformationProps } from './ProductInformation';

export default {
  component: ProductInformation,
  title: 'ProductInformation',
} as Meta;

const Template: ComponentStory<typeof ProductInformation> = function (
  args: ProductInformationProps
) {
  return <ProductInformation {...args} />;
};

export const DefaultProductInformation = Template.bind({});

const props: Partial<ProductInformationProps> = {
  rating: 3.7,
  gradesCount: 345,
  commentsCount: 34,
  characteristics: [
    {
      label: 'Жирность на 100г',
      value: '37г',
    },
    {
      label: 'Страна',
      value: 'Италия',
    },
    {
      label: 'Вид',
      value: 'Твёрдый',
    },
    {
      label: 'Категория сыра',
      value: 'Свежий',
    },
    {
      label: 'Молоко',
      value: 'Коровье',
    },
    {
      label: 'Наличие сычужного фермента',
      value: 'Да',
    },
    {
      label: 'Тип корочки',
      value: 'С белой плесенью',
    },
    {
      label: 'Выдержка',
      value: 'Без выдержки',
    },
  ],
};

DefaultProductInformation.args = props;
