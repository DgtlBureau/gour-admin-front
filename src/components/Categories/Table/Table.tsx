import React, { ChangeEvent, useState } from 'react';

import { Box } from 'components/UI/Box/Box';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Row, Table } from 'components/UI/Table/Table';

import type { MidLevelCategory } from 'types/entities/Category';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type CategoryActions = {
  onDelete: () => void;
  onEdit: () => void;
};

type Props = {
  categories: MidLevelCategory[];
  onDelete: (id: number) => void;
  onEdit: (category: MidLevelCategory) => void;
};

const tableHeader = ['Категория', 'Действие'];

function RowActions({ onDelete, onEdit }: CategoryActions) {
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

export function CategoriesTable({ categories, onDelete, onEdit }: Props) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows: Row[] = categories.map((category, i) => ({
    id: i,
    cells: [category.title.ru, <RowActions onDelete={() => onDelete(category.id)} onEdit={() => onEdit(category)} />],
  }));

  return (
    <Table
      rowTitleList={tableHeader}
      rows={rows}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 15]}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
