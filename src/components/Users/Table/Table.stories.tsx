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
      uuid: '0',
      name: 'Саша',
      login: '123456789',
      role: {
        uuid: 'admin',
        key: 'ADMIN',
      },
      isApproved: true,
    },
    {
      uuid: '1',
      name: 'Лёша',
      login: '123456789',
      role: {
        uuid: 'admin',
        key: 'ADMIN',
      },
      isApproved: true,
    },
    {
      uuid: '2',
      name: 'Паша',
      login: '123456789',
      role: {
        uuid: 'moderator',
        key: 'MODERATOR',
      },
      isApproved: true,
    },
  ],
};

DefaultUsersTable.args = props;
