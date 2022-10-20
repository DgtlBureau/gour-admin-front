import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { UploadFile } from './UploadFile';

export default {
  title: 'UI/UploadFile',
  component: UploadFile,
} as ComponentMeta<typeof UploadFile>;

const Template: ComponentStory<typeof UploadFile> = function (args) {
  return <UploadFile {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {
  id: 'uploadFile',
  allowedFileTypes: ['application/pdf'],
};
