import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ProductsTable, ProductsTableProps } from './ProductsTable';

export default {
  component: ProductsTable,
  title: 'src/components/Product/ProductsTable',
} as Meta;

const Template: ComponentStory<typeof ProductsTable> = function (
  args: ProductsTableProps
) {
  return <ProductsTable {...args} />;
};
export const DefaultProductsTable = Template.bind({});
const props: Partial<ProductsTableProps> = {
  products: [
    { id: 0, image: 'none', title: 'СЫЫЫР 1', category: 'cheese', price: 2000 },
    { id: 1, image: 'none', title: 'СЫЫЫР 2', category: 'cheese', price: 1500 },
    { id: 2, image: 'none', title: 'СЫЫЫР 3', category: 'cheese', price: 1500 },
    { id: 3, image: 'none', title: 'СЫЫЫР 4', category: 'cheese', price: 1500 },
    { id: 4, image: 'none', title: 'МЯЯЯСО 1', category: 'meat', price: 1500 },
    { id: 5, image: 'none', title: 'МЯЯЯСО 2', category: 'meat', price: 1500 },
    { id: 6, image: 'none', title: 'СЫЫЫР 5', category: 'cheese', price: 1500 },
    { id: 7, image: 'none', title: 'Пиварий 1', category: 'beer', price: 1500 },
    { id: 8, image: 'none', title: 'Пиварий 2', category: 'berr', price: 1500 },
  ],
  categories: [
    { label: 'Сыр', value: 'cheese' },
    { label: 'Мясо', value: 'meat' },
  ],
};

DefaultProductsTable.args = props;
