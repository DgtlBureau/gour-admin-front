import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StockTable } from './Table';

function generateStock(
  id: number,
  image: string,
  title: string,
  start: string,
  end: string,
  isActual: boolean
) {
  return {
    image,
    title,
    start,
    end,
    id,
    isActual,
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
      true
    ),
    generateStock(2, 'image', 'title 1', '22.02.2022', '22.03.2022', true),
    generateStock(3, 'image', 'Прошедшая', '22.02.2022', '22.03.2022', false),
    generateStock(4, 'image', 'Прошедшая', '22.02.2022', '22.03.2022', false),
    generateStock(5, 'image', 'title 1', '22.02.2022', '22.03.2022', true),
    generateStock(6, 'image', 'Прошедшая', '22.02.2022', '22.03.2022', false),
    generateStock(7, 'image', 'title 1', '22.02.2022', '22.03.2022', true),
  ],
};
