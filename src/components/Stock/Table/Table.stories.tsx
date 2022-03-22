import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StockTable } from './Table';

function generateStock(
  id: number,
  image: string,
  title: string,
  startDate: string,
  endDate: string,
  status: string
) {
  return {
    image,
    title,
    startDate,
    endDate,
    status,
    id,
  };
}

export default {
  title: 'Stock/Table',
  component: StockTable,
} as ComponentMeta<typeof StockTable>;

const Template: ComponentStory<typeof StockTable> = function (args) {
  return <StockTable {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {
  stocksList: [
    generateStock(
      1,
      'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
      'title 1',
      '22.02.2022',
      '22.03.2022',
      'active'
    ),
    generateStock(2, 'image', 'title 1', '22.02.2022', '22.03.2022', 'active'),
    generateStock(3, 'image', 'title 1', '22.02.2022', '22.03.2022', 'active'),
    generateStock(4, 'image', 'title 1', '22.02.2022', '22.03.2022', 'active'),
    generateStock(5, 'image', 'title 1', '22.02.2022', '22.03.2022', 'active'),
    generateStock(6, 'image', 'title 1', '22.02.2022', '22.03.2022', 'active'),
    generateStock(7, 'image', 'title 1', '22.02.2022', '22.03.2022', 'active'),
  ],
};
