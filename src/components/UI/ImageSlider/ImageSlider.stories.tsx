import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ImageSlider, ImageSliderProps } from './ImageSlider';

export default {
  component: ImageSlider,
  title: 'src/components/UI/ImageSlider',
} as Meta;

const Template: ComponentStory<typeof ImageSlider> = (args: ImageSliderProps) => <ImageSlider {...args} />;
export const DefaultImageSlider = Template.bind({});
const props: Partial<ImageSliderProps> = {};

DefaultImageSlider.args = props;
