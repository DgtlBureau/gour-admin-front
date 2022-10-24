import React, { ChangeEvent, useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Table } from './Table';

export default {
  title: 'UI/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const rowTitles = ['test1', 'test2', 'test3', 'test4'];

const Template: ComponentStory<typeof Table> = args => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Table
      {...args}
      rows={[]}
      page={page}
      rowsPerPageOptions={[2, 5, 10]}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  rowTitleList: rowTitles,
};
