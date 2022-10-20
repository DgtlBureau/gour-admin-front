import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { UsersTable, UsersTableProps } from './Table';

export default {
  component: UsersTable,
  title: 'Tables/Users',
} as Meta;

const Template: ComponentStory<typeof UsersTable> = function (args: UsersTableProps) {
  return <UsersTable {...args} />;
};
export const DefaultUsersTable = Template.bind({});
const props: Partial<UsersTableProps> = {};

DefaultUsersTable.args = props;
