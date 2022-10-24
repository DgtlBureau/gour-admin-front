import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PagesAboutUsForm } from './PagesForm';

export default {
  title: 'Forms/PagesAboutUs',
  component: PagesAboutUsForm,
} as ComponentMeta<typeof PagesAboutUsForm>;

const Template: ComponentStory<typeof PagesAboutUsForm> = args => <PagesAboutUsForm {...args} />;

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
