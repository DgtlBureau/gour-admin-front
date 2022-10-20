import React, { ChangeEvent, useState } from 'react';

import { Chip } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from '../Button/Button';
import { Table } from './Table';

export default {
  title: 'UI/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const rows = [
  {
    id: 0,
    cells: [<Button>test</Button>, <Chip label='Chip Filled' />, 'value3', 'value4'],
  },
  { id: 1, cells: ['value1', 'value2', 'value3', 'value4'] },
  { id: 2, cells: ['value1', 'value2', 'value3', 'value4'] },
  {
    id: 3,
    cells: [<Button>test</Button>, <Chip label='Chdqwdqwdip Filled' />, 'valueqwdqwd3', 'valuqsccqcqe4'],
  },
  { id: 4, cells: ['value1', 'value2', 'value3', 'value4'] },
  {
    id: 5,
    cells: [<Button>dqwwqdqwdd</Button>, <Chip label='Chip Filled' />, 'value3', 'value4'],
  },
  {
    id: 6,
    cells: [<Button>teswqdwqdqwdqwdwqdwqdt</Button>, <Chip label='Cdqwdqwdwqdhip Filled' />, 'value3', 'value4'],
  },
];

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
