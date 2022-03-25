import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {ProductsTable, ProductsTableProps} from "./ProductsTable";

export default {
    component: ProductsTable,
    title: "src/components/Product/ProductsTable",
} as Meta;

const Template: ComponentStory<typeof ProductsTable> = (args: ProductsTableProps) => <ProductsTable {...args} />;
export const DefaultProductsTable = Template.bind({});
const props: Partial<ProductsTableProps> = {};

DefaultProductsTable.args = props;
