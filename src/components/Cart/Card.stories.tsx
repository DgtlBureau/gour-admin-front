import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Card } from './Card';

export default {
  title: 'Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const ONE_GRAMM_OF_CHEESE = 4.1;
const DISCOUNT = 0.25;
const WEIGHING_VALUE = 100;

const Template: ComponentStory<typeof Card> = function () {
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
      <Card
        title="Chevrano XO Козий Элитный Сыр"
        amount={amount}
        price={price}
        discount={DISCOUNT}
        productImg="https://www.gastronom.ru/binfiles/images/20190731/b05fb007.jpg"
        onElect={() => console.log('onElect')}
        onDelete={() => console.log('onDelete')}
        onEdit={edit}
      />
    </div>
  );
};

export const DefaultState = Template.bind({});
