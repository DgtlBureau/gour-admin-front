import React, { useState } from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { OrderForm, OrderFields } from './OrderForm';

export default {
  component: OrderForm,
  title: 'OrderForm',
} as Meta;

const profiles = [
  {
    value: '0',
    label: 'Латышских стрелков, 5',
  },
  {
    value: '1',
    label: 'Стрелков латышских, 10',
  },
];

const Template: ComponentStory<typeof OrderForm> = function () {
  const [order, setOrder] = useState({} as OrderFields);
  const [discount, setDiscount] = useState(0);

  const submit = (data: OrderFields) => {
    setOrder(data);
    console.log(data);
  };

  const checkPromo = (code: string) => {
    if (code === 'promo') {
      setDiscount(1000);
      return 'Вы применили промокод: скидка 1000 рублей';
    }
    return undefined;
  };

  return (
    <OrderForm
      order={order}
      productsCount={3}
      cost={2230}
      discount={discount}
      delivery={500}
      deliveryProfiles={profiles}
      onSubmit={submit}
      onPromo={checkPromo}
    />
  );
};
export const DefaultOrderForm = Template.bind({});
