import React, { ChangeEvent, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { IconButton } from '../../UI/IconButton/IconButton';
import { Table } from '../../UI/Table/Table';

import sx from './Table.styles';

const tabsOptions = [
  {
    value: 'All',
    label: 'Все',
  },
  {
    value: 'Actual',
    label: 'Актуальные',
  },
  {
    value: 'Past',
    label: 'Прошедшие',
  },
];

export type Stock = {
  id: number;
  image: string;
  title: string;
  start: string;
  end: string;
  isActual: boolean;
};

type RowActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

type StockTableProps = {
  stocksList: Stock[];
  onEdit: (stockId: number) => void;
  onDelete: (stockId: number) => void;
};

function RowActions({ onDelete, onEdit }: RowActionsProps) {
  return (
    <Box>
      <IconButton onClick={onEdit} component="symbol">
        <EditIcon />
      </IconButton>
      <IconButton onClick={onDelete} component="symbol">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}

export function StockTable({ stocksList, onEdit, onDelete }: StockTableProps) {
  const [page, setPage] = useState<number>(0);
  const [value, setValue] = useState<string>('All');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const changeTab = (val: string) => setValue(val);

  const rows = stocksList
    .filter(stock => {
      switch (value) {
        case 'Actual':
          return stock.isActual;
        case 'Past':
          return !stock.isActual;
        default:
          return true;
      }
    })
    .map(stock => ({
      id: stock.id,
      cells: [
        <Box sx={sx.stockImg}>
          <img src={stock.image} alt="promotion" />
        </Box>,
        stock.title,
        stock.start,
        stock.end,
        <Typography
          variant="body1"
          sx={{ ...sx.status, ...(stock.isActual ? sx.actual : sx.past) }}
        >
          {stock.isActual ? 'Актуальное' : 'Прошедшие'}
        </Typography>,
        <RowActions
          onDelete={() => {
            onDelete(stock.id);
          }}
          onEdit={() => {
            onEdit(stock.id);
          }}
        />,
      ],
    }));

  const сhangePage = (_: unknown, newPage: number) => setPage(newPage);

  const сhangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tabs = {
    value,
    options: tabsOptions,
    onChange: changeTab,
  };

  return (
    <Table
      tabs={tabs}
      rowTitleList={[
        'Изображение',
        'Заголовок',
        'Дата начала',
        'Дата завершения ',
        'Статус',
        'Действие',
      ]}
      rows={rows}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 20]}
      onPageChange={сhangePage}
      onRowsPerPageChange={сhangeRowsPerPage}
    />
  );
}
