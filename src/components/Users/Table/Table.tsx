import React, { useState } from 'react';

import { Path } from 'constants/routes';
import { Options } from 'constants/tabs';
import { Roles } from 'constants/users/roles';

import { Box } from 'components/UI/Box/Box';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Link } from 'components/UI/Link/Link';
import { Table } from 'components/UI/Table/Table';
import { Typography } from 'components/UI/Typography/Typography';

import { ClientRole } from 'types/entities/ClientRole';
import { User } from 'types/entities/User';

import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/LocalMall';

import sx from './Table.styles';
import loginIcon from './assets/login.svg';

export type UserTableItem = {
  login: string;
  name: string;
  role: ClientRole;
  id: number;
};

export type UsersTableProps = {
  currentUser: User;
  users: UserTableItem[];
  categories: {
    value: string;
    label: string;
  }[];
  onDelete: (id: number) => void;
  onAddCheesecoins: (id: number) => void;
};

export function UsersTable({ currentUser, users, categories, onDelete, onAddCheesecoins }: UsersTableProps) {
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

  const checkClientRole = (role: Roles) => [Roles.CLIENT, Roles.COMPANY, Roles.COLLECTIVE_PURCHASE].includes(role);

  const canSignInAsUser = !!currentUser.roles.find(role => role.key === Roles.ADMIN);

  const rows = filteredUsers.map((user, i) => ({
    id: i,
    cells: [
      user.name,
      user.login,

      <Typography variant='body1' sx={sx.role}>
        {user.role.title}
      </Typography>,
      <>
        <IconButton component='button' onClick={() => onDelete(user.id)}>
          <DeleteIcon />
        </IconButton>
        {checkClientRole(user.role?.key as Roles) ? (
          <>
            <IconButton component='button' onClick={() => onAddCheesecoins(user.id)}>
              <AddBoxIcon />
            </IconButton>
            {canSignInAsUser && (
              <a
                href={`${process.env.REACT_APP_BACKEND_URL}/clients/${user.id}/login`}
                target='_blank'
                rel='noreferrer'
              >
                <IconButton component='div'>
                  <img src={loginIcon} alt='' />
                </IconButton>
              </a>
            )}
            <Link href={`${Path.USERS}/${user.id}/orders`}>
              <IconButton component='button'>
                <ShoppingCartIcon />
              </IconButton>
            </Link>
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
