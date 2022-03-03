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
  characteristics: {
    'Жирность на 100г': '37г',
    Страна: 'Италия',
    Вид: 'Твёрдый',
    'Категория сыра': 'Свежий',
    Молоко: 'Коровье',
    'Наличие сычужного фермента': 'Да',
    'Тип корочки': 'С белой плесенью',
    Выдержка: 'Без выдержки',
  },
  onClickComments: () => console.log('clickComments'),
};

DefaultProductInformation.args = props;
