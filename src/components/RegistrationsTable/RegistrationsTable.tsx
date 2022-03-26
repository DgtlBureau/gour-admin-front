import React, { useState } from 'react';

import { Box } from '../UI/Box/Box';
import { Table } from '../UI/Table/Table';
import { Typography } from '../UI/Typography/Typography';
import { IconButton } from '../UI/IconButton/IconButton';

import busketIcon from '../../assets/icons/table/busket.svg';
import checkIcon from '../../assets/icons/table/check.svg';

const sx = {
  role: {
    width: 'fit-content',
    padding: '0px 12px',
    fontSize: '12px',
    fontWeight: 400,
    background: 'rgba(0, 0, 0, 0.12)',
    borderRadius: '10px',
  },
};

const tabsOptions = [
  {
    id: 'waitingForApproval',
    label: 'Ждут подтверждения',
  },
  {
    id: 'Approved',
    label: 'Подтверждены',
  },
];

type User = {
  id: number;
  name: string;
  phone: string;
  role: string;
  isConfirmed: boolean;
}

export type RegistrationsTableProps = {
  users: User[];
  onAccept: (id: number) => void;
  onDelete: (id: number) => void;
}

export function RegistrationsTable({
  users,
  onAccept,
  onDelete,
}: RegistrationsTableProps) {
  const [selectedId, setSelectedId] = useState<string>('waitingForApproval');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const isConfirmed = selectedId !== 'waitingForApproval';

  const changeTab = (id: string) => setSelectedId(id);

  const changePage = (_: unknown, newPage: number) => setPage(newPage);

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = users
    .filter(user => user.isConfirmed === isConfirmed)
    .map((user, i) => (
      {
        id: i,
        cells: [
          user.name,
          user.phone,
          <Typography sx={sx.role}>{user.role}</Typography>,
          <>
            <IconButton component="button" onClick={() => onDelete(user.id)}>
              <img src={busketIcon} alt="" />
            </IconButton>
            <IconButton component="button" onClick={() => onAccept(user.id)}>
              <img src={checkIcon} alt="" />
            </IconButton>
          </>,
        ],
      }
    ));

  const tabs = {
    selectedId,
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
