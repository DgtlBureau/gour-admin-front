import React, { useState } from 'react';

import { Path } from 'constants/routes';
import { format } from 'date-fns';

import { Box } from 'components/UI/Box/Box';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Link } from 'components/UI/Link/Link';
import { Table } from 'components/UI/Table/Table';
import { Typography } from 'components/UI/Typography/Typography';

import { PromoCode } from 'types/entities/PromoCode';

import TrashIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import sx from './Table.styles';

const NOW = new Date();

type RowActionsProps = {
  promoCodeId: number;
  onDelete: () => void;
};

export type PromoCodeTableProps = {
  codes: PromoCode[];
  onRemove(code: PromoCode): void;
};

function RowActions({ promoCodeId, onDelete }: RowActionsProps) {
  return (
    <Box>
      <IconButton href={`/${Path.PROMO_CODES}/${promoCodeId}`} component={Link}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={onDelete} component='symbol'>
        <TrashIcon />
      </IconButton>
    </Box>
  );
}

export function PromoCodeTable({ codes, onRemove }: PromoCodeTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const changePage = (_: unknown, newPage: number) => setPage(newPage);

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rowTitleList = [
    'Промокод',
    'Скидка',
    'Общее кол-во',
    'Кол-во для одного',
    'Дата завершения',
    'Статус',
    'Действие',
  ];

  const rows = codes.map((code, i) => {
    const { id, key, discount, end, totalCount, countForOne } = code;

    const endDate = new Date(end);
    const endText = format(endDate, 'dd.MM.yyyy');
    const isActual = NOW < endDate;
    const statusText = isActual ? 'Актуальный' : 'Прошедший';
    const statusSx = { ...sx.status, ...(isActual ? sx.actual : sx.past) };

    return {
      id: i,
      cells: [
        key,
        `${discount}%`,
        totalCount,
        countForOne,
        endText,
        <Typography variant='body1' sx={statusSx}>
          {statusText}
        </Typography>,
        <RowActions promoCodeId={id} onDelete={() => onRemove(code)} />,
      ],
    };
  });

  return (
    <Table
      rowTitleList={rowTitleList}
      rows={rows}
      page={page}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={changeRowsPerPage}
      onPageChange={changePage}
    />
  );
}
