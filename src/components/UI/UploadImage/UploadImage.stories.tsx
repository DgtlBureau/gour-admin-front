import React, { ChangeEvent, useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { UploadImage } from './UploadImage';

export default {
  title: 'UI/UploadImage',
  component: UploadImage,
} as ComponentMeta<typeof UploadImage>;

const Template: ComponentStory<typeof UploadImage> = args => {
  const [value, setValue] = useState<File | null>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files?.[0]) return;
    setValue(files[0]);
  };
  const onDelete = () => {
    setValue(null);
  };

  return <UploadImage {...args} value={value} onChange={onChange} onDelete={onDelete} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {
  id: 'uploadImage',
  label: 'test upload',
  allowedFileTypes: ['image/jpeg', 'image/png'],
};
