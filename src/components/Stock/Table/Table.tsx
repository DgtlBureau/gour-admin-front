import React, { ChangeEvent, useState } from 'react';

import { Options } from 'constants/tabs';

import { Box } from 'components/UI/Box/Box';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Table } from 'components/UI/Table/Table';
import { Typography } from 'components/UI/Typography/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import sx from './Table.styles';

const tabsOptions = [
  {
    value: Options.ALL,
    label: 'Все',
  },
  {
    value: Options.ACTUAL,
    label: 'Актуальные',
  },
  {
    value: Options.PAST,
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
      <IconButton onClick={onEdit} component='symbol'>
        <EditIcon />
      </IconButton>
      <IconButton onClick={onDelete} component='symbol'>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}

export function StockTable({ stocksList, onEdit, onDelete }: StockTableProps) {
  const [page, setPage] = useState<number>(0);
  const [tabValue, setTabValue] = useState<string>(Options.ALL);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const titleList = ['Изображение', 'Заголовок', 'Дата начала', 'Дата завершения', 'Статус', 'Действие'];

  const changeTab = (val: string) => setTabValue(val);

  const rows = stocksList
    .filter(stock => {
      switch (tabValue) {
        case Options.ACTUAL:
          return stock.isActual;
        case Options.PAST:
          return !stock.isActual;
        default:
          return true;
      }
    })
    .map(stock => ({
      id: stock.id,
      cells: [
        <Box sx={sx.stockImg}>
          <img src={stock.image} alt='promotion' />
        </Box>,
        stock.title,
        stock.start,
        stock.end,
        <Typography variant='body1' sx={{ ...sx.status, ...(stock.isActual ? sx.actual : sx.past) }}>
          {stock.isActual ? 'Актуальное' : 'Прошедшее'}
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

  const сhangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tabs = {
    value: tabValue,
    options: tabsOptions,
    onChange: changeTab,
  };

  return (
    <Table
      tabs={tabs}
      rowTitleList={titleList}
      rows={rows}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={сhangePage}
      onRowsPerPageChange={сhangeRowsPerPage}
    />
  );
}
