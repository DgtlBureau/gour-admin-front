import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ProductInformation, ProductInformationProps } from './ProductInformation';

export default {
  component: ProductInformation,
  title: 'src/components/UI/ProductInformation',
} as Meta;

const Template: ComponentStory<typeof ProductInformation> = function (
  args: ProductInformationProps
) {
  return <ProductInformation {...args} />;
};

export const DefaultProductInformation = Template.bind({});
const props: Partial<ProductInformationProps> = {};

DefaultProductInformation.args = props;
