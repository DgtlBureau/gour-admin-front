import React, { useState } from 'react';

import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';

import { Box } from '../../UI/Box/Box';
import { Table } from '../../UI/Table/Table';
import { IconButton } from '../../UI/IconButton/IconButton';
import { Typography } from '../../UI/Typography/Typography';
import { Options } from '../../../constants/tabs';

import loginIcon from './assets/login.svg';

const sx = {
  role: {
    width: 'fit-content',
    padding: '6px',
    background: '#F4E7CE',
    borderRadius: '6px',
  },
};

export type UserTableItem = {
  login: string;
  name: string;
  role: string;
  uuid: string;
};

export type UsersTableProps = {
  users: UserTableItem[];
  categories: {
    value: string;
    label: string;
  }[];
  onDelete: (uuid: string) => void;
  onAddCheesecoins: (uuid: string) => void;
};

export function UsersTable({
  users,
  categories,
  onDelete,
  onAddCheesecoins,
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

  const filteredUsers =
    tabsValue === Options.ALL ? users : users.filter(user => user.role === tabsValue);

  const rows = filteredUsers.map((user, i) => ({
    id: i,
    cells: [
      user.name,
      user.login,
      <Typography variant="body1" sx={sx.role}>
        {user.role}
      </Typography>,
      <>
        <IconButton component="button" onClick={() => onDelete(user.uuid)}>
          <DeleteIcon />
        </IconButton>
        {['CLIENT', 'COMPANY', 'COLLECTIVE_PURCHASE'].includes(user.role) ? (
          <>
            <IconButton component="button" onClick={() => onAddCheesecoins(user.uuid)}>
              <AddBoxIcon />
            </IconButton>
            <a
              href={`${process.env.REACT_APP_STORE_PATH}/api/clients/${user.uuid}/login`}
              target="_blank"
              rel="noreferrer"
            >
              <IconButton component="div">
                <img src={loginIcon} alt="" />
              </IconButton>
            </a>
          </>
        ) : null}
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
        rowTitleList={['Имя Фамилия', 'Логин', 'Роль', 'Действие']}
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
