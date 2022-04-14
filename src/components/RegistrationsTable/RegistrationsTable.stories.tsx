import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { RegistrationsTable, RegistrationsTableProps } from './RegistrationsTable';

export default {
  component: RegistrationsTable,
  title: 'RegistrationsTable',
} as Meta;

const Template: ComponentStory<typeof RegistrationsTable> = function (
  args: RegistrationsTableProps
) {
  return <RegistrationsTable {...args} />;
};
export const DefaultRegistrationsTable = Template.bind({});

const props: Partial<RegistrationsTableProps> = {
  users: [
    {
      id: 0,
      name: 'Саша',
      phone: '123456789',
      role: 'Организатор коллективной закупки',
      isApproved: true,
    },
    {
      id: 1,
      name: 'Паша',
      phone: '123456789',
      role: 'Физическое лицо',
      isApproved: true,
    },
    {
      id: 2,
      name: 'Лёша',
      phone: '123456789',
      role: 'Юридическое лицо',
      isApproved: false,
    },
    {
      id: 3,
      name: 'Света',
      phone: '123456789',
      role: 'Юридическое лицо',
      isApproved: true,
    },
    {
      id: 4,
      name: 'Артур',
      phone: '123456789',
      role: 'Физическое лицо',
      isApproved: false,
    },
    {
      id: 5,
      name: 'Женя',
      phone: '123456789',
      role: 'Юридическое лицо',
      isApproved: false,
    },
    {
      id: 6,
      name: 'Семён',
      phone: '123456789',
      role: 'Юридическое лицо',
      isApproved: false,
    },
  ],
};

DefaultRegistrationsTable.args = props;
