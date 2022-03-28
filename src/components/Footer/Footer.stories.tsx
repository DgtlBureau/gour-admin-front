import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { Footer } from './Footer';

export default {
  component: Footer,
  title: 'Footer',
} as Meta;

const Template: ComponentStory<typeof Footer> = function () {
  return <Footer />;
};
export const DefaultFooter = Template.bind({});
