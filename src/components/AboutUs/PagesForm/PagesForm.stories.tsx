import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PagesAboutUsForm } from './PagesForm';

export default {
  title: 'Forms/PagesAboutUs',
  component: PagesAboutUsForm,
} as ComponentMeta<typeof PagesAboutUsForm>;

const Template: ComponentStory<typeof PagesAboutUsForm> = function (args) {
  return <PagesAboutUsForm {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  defaultValues: {
    title: 'sdfsdfsdf',
    description: 'sdfsdfsdf',
    isIndexed: true,
    metaTitle: 'sdfsdf',
    metaDescription: 'sdfsdfsd',
    metaKeywords: 'sdfsdf',
  },
};
