import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { City } from '../../../@types/entities/City';
import { IconButton } from '../../UI/IconButton/IconButton';
import { Table } from '../../UI/Table/Table';

export type CitiesTableProps = {
  cities: City[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export function CitiesTable({ cities, onDelete, onEdit }: CitiesTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const changePage = (_: unknown, newPage: number) => setPage(newPage);

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = cities.map((city, i) => ({
    id: i,
    cells: [
      city.name.ru,
      city.name.en,
      <>
        <IconButton component="button" onClick={() => onDelete(city.id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton component="button" onClick={() => onEdit(city.id)}>
          <EditIcon />
        </IconButton>
      </>,
    ],
  }));

  return (
    <Table
      rowTitleList={['Название (Рус)', 'Название (Eng)', 'Действие']}
      rows={rows}
      rowsPerPage={rowsPerPage}
      page={page}
      rowsPerPageOptions={[5, 10, 25]}
      onPageChange={changePage}
      onRowsPerPageChange={changeRowsPerPage}
    />
  );
}
