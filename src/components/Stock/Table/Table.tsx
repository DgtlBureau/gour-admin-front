import React, { ChangeEvent, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Chip } from '@mui/material';
import { Box } from '../../UI/Box/Box';
import { IconButton } from '../../UI/IconButton/IconButton';
import { Table } from '../../UI/Table/Table';

type Stock = {
  id: number;
  image: string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
};

type StockActions = {
  onEdit: () => void;
  onDelete: () => void;
};

type Props = {
  stocksList: Stock[];
  onEdit: (stockId: number) => void;
  onDelete: (stockId: number) => void;
};

function RowActions({ onDelete, onEdit }: StockActions) {
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

export function StockTable({ stocksList, onEdit, onDelete }: Props) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = stocksList.map(stock => {
    const row = Object.keys(stock).map(key => {
      switch (key) {
        case 'image':
          return (
            <Box sx={{ maxWidth: '144px', height: '60px', overflow: 'hidden' }}>
              <img style={{ height: '100%' }} src={stock.image} alt="promotion" />
            </Box>
          );
        case 'id':
          return (
            <RowActions
              onDelete={() => {
                onDelete(stock.id);
              }}
              onEdit={() => {
                onEdit(stock.id);
              }}
            />
          );
        case 'status':
          return <Chip label={stock.status} />;
        default:
          return stock[key as keyof Stock];
      }
    });
    return { id: stock.id, cells: row };
  });

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Table
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
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
