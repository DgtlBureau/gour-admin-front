import React, { useState } from 'react';

import { Box } from '../../UI/Box/Box';
import { Table } from '../../UI/Table/Table';
import { IconButton } from '../../UI/IconButton/IconButton';
import { Typography } from '../../UI/Typography/Typography';
import { IUser } from '../../../@types/entities/IUser';
import { Options } from '../../../constants/tabs';

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

export type UsersTableProps = {
  users: IUser[];
  categories: {
    value: string,
    label: string,
  }[];
  onDelete: (uuid: string) => void;
  onConfirm: (uuid: string) => void;
};

export function UsersTable({
  users,
  categories,
  onDelete,
  onConfirm,
}: UsersTableProps) {
  const [tabsValue, setTabsValue] = useState<string>(Options.ALL);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const changeTab = (value: string) => setTabsValue(value);

  const changePage = (_: unknown, newPage: number) => setPage(newPage);

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredUsers = tabsValue === Options.ALL ? users : users.filter(user => user.role.key === tabsValue);

  const rows = filteredUsers.map((user, i) => ({
    id: i,
    cells: [
      user.name,
      user.login,
      <Typography variant="body1" sx={sx.role}>{user.role.key}</Typography>,
      <>
        <IconButton component="button" onClick={() => onDelete(user.uuid)}>
          <img src={busketIcon} alt="" />
        </IconButton>
        <IconButton component="button" onClick={() => onConfirm(user.uuid)}>
          <img src={checkIcon} alt="" />
        </IconButton>
      </>,
    ],
  }));

  const tabs = {
    value: tabsValue,
    options: categories,
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
