import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ProductsTable, ProductsTableProps } from './ProductsTable';

export default {
  component: ProductsTable,
  title: 'src/components/Product/ProductsTable',
} as Meta;

const Template: ComponentStory<typeof ProductsTable> = function (args: ProductsTableProps) {
  return <ProductsTable {...args} />;
};
export const DefaultProductsTable = Template.bind({});
const props: Partial<ProductsTableProps> = {};

DefaultProductsTable.args = props;
