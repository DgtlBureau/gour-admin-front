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
  // users: [
  //   {
  //     id: 0,
  //     name: 'Саша',
  //     phone: '123456789',
  //     role: 'Организатор коллективной закупки',
  //     isConfirmed: true,
  //   },
  //   {
  //     id: 1,
  //     name: 'Паша',
  //     phone: '123456789',
  //     role: 'Физическое лицо',
  //     isConfirmed: true,
  //   },
  //   {
  //     id: 2,
  //     name: 'Лёша',
  //     phone: '123456789',
  //     role: 'Юридическое лицо',
  //     isConfirmed: false,
  //   },
  //   {
  //     id: 3,
  //     name: 'Света',
  //     phone: '123456789',
  //     role: 'Юридическое лицо',
  //     isConfirmed: true,
  //   },
  //   {
  //     id: 4,
  //     name: 'Артур',
  //     phone: '123456789',
  //     role: 'Физическое лицо',
  //     isConfirmed: false,
  //   },
  //   {
  //     id: 5,
  //     name: 'Женя',
  //     phone: '123456789',
  //     role: 'Юридическое лицо',
  //     isConfirmed: false,
  //   },
  //   {
  //     id: 6,
  //     name: 'Семён',
  //     phone: '123456789',
  //     role: 'Юридическое лицо',
  //     isConfirmed: false,
  //   },
  // ],
};

DefaultUsersTable.args = props;
