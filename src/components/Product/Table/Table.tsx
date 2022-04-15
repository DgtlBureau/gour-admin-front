import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '../../UI/Box/Box';
import { IconButton } from '../../UI/IconButton/IconButton';
import { Table } from '../../UI/Table/Table';

export type ProductsTableProps = {
  products: {
    id: number;
    image: string;
    title: string;
    category: string;
    cost: number;
  }[];
  categories: {
    label: string;
    value: string;
  }[];
  onEdit(id: number): void;
  onRemove(id: number): void;
};

export function ProductsTable({
  products,
  categories,
  onEdit,
  onRemove,
}: ProductsTableProps) {
  const [value, setValue] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const tabsOptions = [
    {
      value: 'all',
      label: 'Все',
    },
    ...categories.map(category => ({
      value: category.value,
      label: category.label,
    })),
  ];

  const changeTab = (val: string) => setValue(val);

  const changePage = (_: unknown, newPage: number) => setPage(newPage);

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = products
    .filter(product => product.category === value || value === 'all')
    .map((product, i) => ({
      id: i,
      cells: [
        <Box sx={{ maxWidth: '144px', height: '60px', overflow: 'hidden' }}>
          <img style={{ height: '100%' }} src={product.image} alt="promotion" />
        </Box>,
        product.title,
        categories.find(category => category.value === product.category)?.label ||
          'нет категории',
        product.cost,
        <Box>
          <IconButton onClick={() => onEdit(product.id)} component="symbol">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onRemove(product.id)} component="symbol">
            <DeleteIcon />
          </IconButton>
        </Box>,
      ],
    }));

  const tabs = {
    value,
    options: tabsOptions,
    onChange: changeTab,
  };

  return (
    <Box>
      <Table
        tabs={tabs}
        rowTitleList={['Фото', 'Название', 'Категория', 'Цена', 'Действие']}
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
