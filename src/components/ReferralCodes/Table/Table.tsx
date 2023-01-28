import React, { useState } from 'react';

import { Path } from 'constants/routes';

import { Box } from 'components/UI/Box/Box';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Link } from 'components/UI/Link/Link';
import { Table } from 'components/UI/Table/Table';

import { ReferralCode } from 'types/entities/ReferralCode';

import TrashIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

export type ReferralCodeTableProps = {
  codes: ReferralCode[];
  onRemove(code: ReferralCode): void;
};

export function ReferralCodeTable({ codes, onRemove }: ReferralCodeTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const changePage = (_: unknown, newPage: number) => setPage(newPage);

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = codes.map((code, i) => ({
    id: i,
    cells: [
      code.code,
      <Box>
        <IconButton href={`/${Path.REFERRAL_CODES}/${code.id}`} component={Link}>
          <EditIcon />
        </IconButton>
        <IconButton component='button' onClick={() => onRemove(code)}>
          <TrashIcon />
        </IconButton>
      </Box>,
    ],
  }));

  return (
    <Table
      rowTitleList={['Реферальный код', 'Действие']}
      rows={rows}
      page={page}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={changeRowsPerPage}
      onPageChange={changePage}
    />
  );
}
