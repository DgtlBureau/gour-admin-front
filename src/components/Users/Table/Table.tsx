import React, { useState } from 'react';

import { Options } from 'constants/tabs';
import { Roles } from 'constants/users/roles';

import { Box } from 'components/UI/Box/Box';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Table } from 'components/UI/Table/Table';
import { Typography } from 'components/UI/Typography/Typography';

import { ClientRole } from 'types/entities/ClientRole';

import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';

import sx from './Table.styles';
import loginIcon from './assets/login.svg';

export type UserTableItem = {
  login: string;
  name: string;
  role?: ClientRole;
  id: number;
};

export type UsersTableProps = {
  users: UserTableItem[];
  categories: {
    value: string;
    label: string;
  }[];
  onDelete: (id: number) => void;
  onAddCheesecoins: (id: number) => void;
};

export function UsersTable({ users, categories, onDelete, onAddCheesecoins }: UsersTableProps) {
  const [tabsValue, setTabsValue] = useState<string>(Options.ALL);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const changeTab = (value: string) => setTabsValue(value);

  const changePage = (_: unknown, newPage: number) => setPage(newPage);

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredUsers = tabsValue === Options.ALL ? users : users.filter(user => user.role?.key === tabsValue);

  const rows = filteredUsers.map((user, i) => ({
    id: i,
    cells: [
      user.name,
      user.login,
      user.role ? (
        <Typography variant='body1' sx={sx.role}>
          {user.role.title}
        </Typography>
      ) : null,

      <>
        <IconButton component='button' onClick={() => onDelete(user.id)}>
          <DeleteIcon />
        </IconButton>
        {[Roles.CLIENT, Roles.COMPANY, Roles.COLLECTIVE_PURCHASE].includes(user.role?.key as Roles) ? (
          <>
            <IconButton component='button' onClick={() => onAddCheesecoins(user.id)}>
              <AddBoxIcon />
            </IconButton>
            <a href={`${process.env.REACT_APP_BACKEND_URL}/clients/${user.id}/login`} target='_blank' rel='noreferrer'>
              <IconButton component='div'>
                <img src={loginIcon} alt='' />
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
