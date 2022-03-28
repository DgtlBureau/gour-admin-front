import React, { ChangeEvent, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '../../UI/Box/Box';
import { Table } from '../../UI/Table/Table';
import { IconButton } from '../../UI/IconButton/IconButton';

type Category = {
  id: number;
  engName: string;
  rusName: string;
};

type CategoryActions = {
  onDelete: () => void;
  onEdit: () => void;
};

type Props = {
  categories: Category[];
  onDelete: (categoryId: number) => void;
  onEdit: (categoryId: number) => void;
};

const tableHeader = ['Название (Рус)', 'Название (Eng)', 'Действие'];

function RowActions({ onDelete, onEdit }: CategoryActions) {
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

export function CategoriesTable({ categories, onDelete, onEdit }: Props) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const row = categories.map(category => {
    const cells = Object.keys(category).map(key => {
      switch (key) {
        case 'id':
          return (
            <RowActions
              onDelete={() => onDelete(category.id)}
              onEdit={() => onEdit(category.id)}
            />
          );
        default:
          return category[key as keyof Category];
      }
    });

    return {
      id: category.id,
      cells,
    };
  });

  return (
    <Table
      rowTitleList={tableHeader}
      rows={row}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 15]}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
