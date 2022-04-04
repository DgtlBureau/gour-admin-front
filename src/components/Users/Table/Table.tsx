import React, { useState } from 'react';

import { Box } from '../../UI/Box/Box';
import { Table } from '../../UI/Table/Table';
import { IconButton } from '../../UI/IconButton/IconButton';
import { Typography } from '../../UI/Typography/Typography';
import { IUser } from '../../../@types/entities/IUser';

import busketIcon from '../../../assets/icons/table/busket.svg';
import checkIcon from '../../../assets/icons/table/check.svg';

const sx = {
  role: {
    width: 'fit-content',
    padding: '6px',
    background: '#F4E7CE',
    borderRadius: '6px',
  },
};

const tabsOptions = [
  {
    value: 'all',
    label: 'Все',
  },
  {
    value: 'ADMIN',
    label: 'Админ',
  },
  {
    value: 'MODERATOR',
    label: 'Модератор',
  },
  {
    value: 'CLIENT',
    label: 'Клиент',
  },
];

export type UsersTableProps = {
  users: IUser[];
};

export function UsersTable({
  users,
}: UsersTableProps) {
  const [tabsValue, setTabsValue] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const changeTab = (value: string) => setTabsValue(value);

  const changePage = (_: unknown, newPage: number) => setPage(newPage);

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredUsers = tabsValue === 'all' ? users : users.filter(user => user.role.key === tabsValue);

  const rows = filteredUsers.map((user, i) => ({
    id: i,
    cells: [
      user.name,
      user.phone,
      <Typography variant="body1" sx={sx.role}>{user.role.title}</Typography>,
      <>
        <IconButton component="button" onClick={() => ({})}>
          <img src={busketIcon} alt="" />
        </IconButton>
        <IconButton component="button" onClick={() => ({})}>
          <img src={checkIcon} alt="" />
        </IconButton>
      </>,
    ],
  }));

  const tabs = {
    value: tabsValue,
    options: tabsOptions,
    onChange: changeTab,
  };

  return (
    <Box>
      <Table
        tabs={tabs}
        rowTitleList={['Имя Фамилия', 'Телефон', 'Роль', 'Действие']}
        rows={rows}
        rowsPerPage={rowsPerPage}
        page={page}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={changePage}
        onRowsPerPageChange={changeRowsPerPage}
      />
    </Box>
  );
}
