import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { UsersTable, UsersTableProps } from './Table';

export default {
  component: UsersTable,
  title: 'UsersTable',
} as Meta;

const Template: ComponentStory<typeof UsersTable> = function (args: UsersTableProps) {
  return <UsersTable {...args} />;
};
export const DefaultUsersTable = Template.bind({});

const props: Partial<UsersTableProps> = {
  users: [
    {
      id: 0,
      apiUserUuid: '0',
      name: 'Саша',
      phone: '123456789',
      role: {
        title: 'admin',
        key: 'ADMIN',
      },
      isApproved: true,
      additionalInfo: {},
      favorites: [],
    },
    {
      id: 1,
      apiUserUuid: '1',
      name: 'Лёша',
      phone: '123456789',
      role: {
        title: 'admin',
        key: 'ADMIN',
      },
      isApproved: false,
      additionalInfo: {},
      favorites: [],
    },
    {
      id: 2,
      apiUserUuid: '2',
      name: 'Паша',
      phone: '123456789',
      role: {
        title: 'moderator',
        key: 'MODERATOR',
      },
      isApproved: true,
      additionalInfo: {},
      favorites: [],
    },
  ],
};

DefaultUsersTable.args = props;
