import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { StockPreview, StockPreviewProps } from './StockPreview';

export default {
  component: StockPreview,
  title: 'StockPreview',
} as Meta;

const Template: ComponentStory<typeof StockPreview> = function (args: StockPreviewProps) {
  return <StockPreview {...args} />;
};
export const DefaultStockPreview = Template.bind({});

const props: Partial<StockPreviewProps> = {
  title: 'Название',
  start: '22.01.2022',
  end: '11.02.2022',
  status: 'Прошедшие',
  imageSrc: 'https://img.championat.com/c/900x900/news/big/w/u/mozhno-li-est-syr-kazhdyj-den-i-byt-hudym_16197330591446716845.jpg',
};

DefaultStockPreview.args = props;
