import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Link as CustomLink } from '../Link/Link';
import { EmptyCart } from './EmptyCart';

export default {
  title: 'EmptyCart',
  component: EmptyCart,
} as ComponentMeta<typeof EmptyCart>;

const DEFAULT_TITLE = 'В корзине нет товаров';
const DEFAULT_BTN = {
  label: 'Вернуться к покупкам',
  onClick: () => ({}),
};

const Template: ComponentStory<typeof EmptyCart> = function (args) {
  return (
    <EmptyCart title={DEFAULT_TITLE} btn={DEFAULT_BTN}>
      Акции, специальные предложения интересных товаров на
      {' '}
      <CustomLink path="#" underline="none">главной странице</CustomLink>
      {' '}
      помогут вам определиться с выбором!
    </EmptyCart>
  );
};

export const DefaultState = Template.bind({});
