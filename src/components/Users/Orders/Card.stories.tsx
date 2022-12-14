import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { OrdersCard, OrdersCardProps } from './Card';

export default {
  component: OrdersCard,
  title: 'components/LkOrders/LkOrdersCard',
} as Meta;

const Template: ComponentStory<typeof OrdersCard> = (args: OrdersCardProps) => <OrdersCard {...args} />;
export const DefaultLkOrdersCard = Template.bind({});
const props: Partial<OrdersCardProps> = {
  order: {
    id: 'id',
    title: 'Заказ T212486314',
    status: {
      name: 'test',
      color: 'yellow',
    },
    totalSum: 1500,
    createdAt: new Date(),
    address: 'Санкт-Петербург, Каменноостровский пр., дом 43, квартира 44',
    client: 'Иван Иванов',
    currency: 'cheeseCoin',
    products: [
      {
        photo:
          'https://images.unsplash.com/photo-1652173254238-38fb2aa89ffd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        title: 'string',
        amount: 4,
        cost: 6000,
        gram: 150,
        totalSum: 1600,
        totalSumWithoutAmount: 400,
      },
      {
        photo:
          'https://images.unsplash.com/photo-1652173254238-38fb2aa89ffd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        title: 'string',
        amount: 1,
        cost: 2500,
        gram: 150,
        totalSum: 2200,
        totalSumWithoutAmount: 2200,
      },
    ],
    promotions: [
      { title: 'string', amount: 150 },
      { title: 'string', amount: 500 },
      { title: 'string', amount: 360 },
    ],
    deliveryCost: 500,
  },
};

DefaultLkOrdersCard.args = props;
