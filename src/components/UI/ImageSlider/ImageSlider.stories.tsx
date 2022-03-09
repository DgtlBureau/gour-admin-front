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
const props: Partial<ImageSliderProps> = {};

DefaultImageSlider.args = props;
