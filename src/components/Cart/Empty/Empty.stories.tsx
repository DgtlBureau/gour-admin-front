import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Link as CustomLink } from '../../UI/Link/Link';
import { CartEmpty } from './Empty';

export default {
  title: 'CartEmpty',
  component: CartEmpty,
} as ComponentMeta<typeof CartEmpty>;

const DEFAULT_TITLE = 'В корзине нет товаров';
const DEFAULT_BTN = {
  label: 'Вернуться к покупкам',
  onClick: () => ({}),
};

const Template: ComponentStory<typeof CartEmpty> = function (args) {
  return (
    <CartEmpty title={DEFAULT_TITLE} btn={DEFAULT_BTN}>
      Акции, специальные предложения интересных товаров на
      {' '}
      <CustomLink path="#" underline="none">
        главной странице
      </CustomLink>
      {' '}
      помогут вам определиться с выбором!
    </CartEmpty>
  );
};

export const DefaultState = Template.bind({});
