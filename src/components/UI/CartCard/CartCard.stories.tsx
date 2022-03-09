import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CartCard } from './CartCard';

export default {
  title: 'CartCard',
  component: CartCard,
} as ComponentMeta<typeof CartCard>;

const ONE_GRAMM_OF_CHEESE = 4.1;
const DISCOUNT = 0.25;
const WEIGHING_VALUE = 100;

const Template: ComponentStory<typeof CartCard> = function () {
  const [amount, setAmount] = useState(100);
  const price = Math.round(amount * ONE_GRAMM_OF_CHEESE);

  const edit = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setAmount(amount + WEIGHING_VALUE);
      return;
    }
    setAmount(amount - WEIGHING_VALUE);
  };

  return (
    <div style={{ maxWidth: '750px' }}>
      <CartCard
        title="Chevrano XO Козий Элитный Сыр"
        amount={amount}
        price={price}
        discount={DISCOUNT}
        productImg="https://www.gastronom.ru/binfiles/images/20190731/b05fb007.jpg"
        onElect={() => ({})}
        onDelete={() => ({})}
        onEdit={edit}
      />
    </div>
  );
};

export const DefaultState = Template.bind({});
