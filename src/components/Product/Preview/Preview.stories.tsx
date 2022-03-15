import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ProductPreview, ProductPreviewProps } from './Preview';

export default {
  component: ProductPreview,
  title: 'ProductPreview',
} as Meta;

const Template: ComponentStory<typeof ProductPreview> = function (
  args: ProductPreviewProps
) {
  return <ProductPreview {...args} />;
};
export const DefaultProductPreview = Template.bind({});

const props: Partial<ProductPreviewProps> = {
  title: 'Название',
  category: 'Сыр',
  price: 2800,
  imageSrc:
    'https://img.championat.com/c/900x900/news/big/w/u/mozhno-li-est-syr-kazhdyj-den-i-byt-hudym_16197330591446716845.jpg',
};

DefaultProductPreview.args = props;
