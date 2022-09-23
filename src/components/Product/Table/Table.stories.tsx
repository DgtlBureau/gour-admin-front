import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ProductsTable, ProductsTableProps } from './Table';
import { generateMockId } from '../../../utils/wordHelper';

export default {
  component: ProductsTable,
  title: 'Tables/Products',
} as Meta;

const Template: ComponentStory<typeof ProductsTable> = function (
  args: ProductsTableProps
) {
  return <ProductsTable {...args} />;
};
export const DefaultProductsTable = Template.bind({});
const props: Partial<ProductsTableProps> = {
  products: [
    {
      id: 0,
      image: 'none',
      title: 'СЫЫЫР 1',
      categoriesIds: [generateMockId()],
      price: 2000,
    },
    {
      id: 1,
      image: 'none',
      title: 'СЫЫЫР 2',
      categoriesIds: [generateMockId()],
      price: 1500,
    },
    {
      id: 2,
      image: 'none',
      title: 'СЫЫЫР 3',
      categoriesIds: [generateMockId()],
      price: 1500,
    },
    {
      id: 3,
      image: 'none',
      title: 'СЫЫЫР 4',
      categoriesIds: [generateMockId()],
      price: 1500,
    },
    {
      id: 4,
      image: 'none',
      title: 'МЯЯЯСО 1',
      categoriesIds: [generateMockId()],
      price: 1500,
    },
    {
      id: 5,
      image: 'none',
      title: 'МЯЯЯСО 2',
      categoriesIds: [generateMockId()],
      price: 1500,
    },
    {
      id: 6,
      image: 'none',
      title: 'СЫЫЫР 5',
      categoriesIds: [generateMockId()],
      price: 1500,
    },
    {
      id: 7,
      image: 'none',
      title: 'Пиварий 1',
      categoriesIds: [generateMockId()],
      price: 1500,
    },
    {
      id: 8,
      image: 'none',
      title: 'Пиварий 2',
      categoriesIds: [generateMockId()],
      price: 1500,
    },
  ],
  categories: [
    { label: 'Сыр', id: generateMockId() },
    { label: 'Мясо', id: generateMockId() },
  ],
};

DefaultProductsTable.args = props;
