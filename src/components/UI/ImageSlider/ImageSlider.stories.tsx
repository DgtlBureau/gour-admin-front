import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ImageSlider, ImageSliderProps } from './ImageSlider';

export default {
  component: ImageSlider,
  title: 'ImageSlider',
} as Meta;

const Template: ComponentStory<typeof ImageSlider> = function (args: ImageSliderProps) {
  return <ImageSlider {...args} />;
};
export const DefaultImageSlider = Template.bind({});

const props: Partial<ImageSliderProps> = {
  images: [
    {
      small: 'https://lubertsyriamo.ru/files/image/08/21/44/-lg!0x9c.jpg',
      full: 'https://lubertsyriamo.ru/files/image/08/21/44/-lg!0x9c.jpg',
    },
    {
      small: 'https://storage.delikateska.ru/b/3/587ceda3-970a-4c31-bca2-d5be126ce9c0.png',
      full: 'https://storage.delikateska.ru/b/3/587ceda3-970a-4c31-bca2-d5be126ce9c0.png',
    },
    {
      small: 'https://i.ytimg.com/vi/9lCdtB0fwr0/maxresdefault.jpg',
      full: 'https://i.ytimg.com/vi/9lCdtB0fwr0/maxresdefault.jpg',
    },
  ],
};

DefaultImageSlider.args = props;
