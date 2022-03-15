import React, { useState } from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ProductCard } from './Card';
import { Weight } from '../../../@types/entities/Product';

import russiaIcon from '../../../assets/icons/countries/russia.svg';

export default {
  component: ProductCard,
  title: 'ProductCard',
} as Meta;

const DESCRIPTION = `
  Обладает белым цветом, чистым, кисломолочным, 
  чуть сладковатым вкусом и нежной, ломкой структурой. 
  Благодаря изготовлению из козьего молока усиливает иммунитет,
  содержит ценные витамины и минералы.
  Прекрасен как самостоятельное блюдо в сочетании с белым или розовым вином.
`;

const WEIGHTS = [
  {
    value: 100,
    unit: 'г',
  },
  {
    value: 200,
    unit: 'г',
  },
  {
    value: 300,
    unit: 'г',
  },
] as Weight[];

const PRICE = 350;

const PREVIEW_SRC =
  'https://posta-magazine.ru/wp-content/uploads/2020/01/l_main_goatcheese-places_posta-magazine.jpg';

const Template: ComponentStory<typeof ProductCard> = function () {
  const [weightId, setWeightId] = useState(0);
  const [inCart, setInCart] = useState(false);
  const [isElected, setIsElected] = useState(false);

  return (
    <ProductCard
      title="Chevrano XO Козий Элитный Сыр"
      description={DESCRIPTION}
      rating={4.3}
      weights={WEIGHTS}
      weightId={weightId}
      price={PRICE}
      discount={0.2}
      cost={`${PRICE * 10}₽/кг`}
      previewSrc={PREVIEW_SRC}
      countrySrc={russiaIcon}
      inCart={inCart}
      isElected={isElected}
      onAdd={() => setInCart(true)}
      onRemove={() => setInCart(false)}
      onElect={() => setIsElected(!isElected)}
      onEdit={id => setWeightId(id)}
      onDetail={() => ({})}
    />
  );
};

export const DefaultProductCard = Template.bind({});
