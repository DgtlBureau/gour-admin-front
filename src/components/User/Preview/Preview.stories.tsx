import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { UserPreview } from './Preview';

export default {
  component: UserPreview,
  title: 'UserPreview',
} as Meta;

const DEFAULT_USERS = [
  {
    id: 0,
    name: 'Павлик',
    role: 'Админ',
  },
  {
    id: 1,
    name: 'Серёжа',
    role: 'Модератор',
  },
  {
    id: 2,
    name: 'Саша',
    role: 'Модератор',
  },
];

const Template: ComponentStory<typeof UserPreview> = function () {
  return <UserPreview users={DEFAULT_USERS} onEdit={() => ({})} onDelete={() => ({})} />;
};
export const DefaultUserPreview = Template.bind({});
