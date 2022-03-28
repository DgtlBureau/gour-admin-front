import React, { ChangeEvent, useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Chip } from '@mui/material';
import { Table } from './Table';
import { Button } from '../Button/Button';

export default {
  title: 'Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const rowTitles = ['test1', 'test2', 'test3', 'test4'];

const Template: ComponentStory<typeof Table> = function (args) {
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
