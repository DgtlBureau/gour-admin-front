import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UploadImage } from './UploadImage';

export default {
  title: 'UploadImage',
  component: UploadImage,
} as ComponentMeta<typeof UploadImage>;

const Template: ComponentStory<typeof UploadImage> = function (args) {
  return <UploadImage {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {
  id: 'uploadImage',
  label: 'test upload',
  allowedFileTypes: ['image/jpeg', 'image/png'],
};
