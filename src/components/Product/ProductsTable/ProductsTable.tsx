import React, { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '../../UI/Box/Box';
import { IconButton } from '../../UI/IconButton/IconButton';
import { Table } from '../../UI/Table/Table';
import { ProductTableDto } from '../../../@types/dto/table/products.dto';

export type ProductsTableProps = {
  products: ProductTableDto[];
  categories: {
    label: string;
    value: string;
  }[];
  page: number;
  rowsCount: number;
  onChangePage: (_: unknown, newPage: number) => void;
  rowsPerPage: number;
  onChangeRowsPerPage: (rowPerPage: number) => void;
  onEdit(id: number): void;
  onRemove(id: number): void;
};

export function ProductsTable({
  products,
  categories,
  page,
  rowsCount,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onEdit,
  onRemove,
}: ProductsTableProps) {
  const [selectedId, setSelectedId] = useState<string>('all');

  const tabsOptions = [
    {
      id: 'all',
      label: 'Все',
    },
    ...categories.map(category => ({
      id: category.value,
      label: category.label,
    })),
  ];

  const changeTab = (id: string) => setSelectedId(id);

  const rows = products
    .filter(product => product.category === selectedId || selectedId === 'all')
    .map((product, i) => ({
      id: i,
      cells: [
        <Box sx={{ maxWidth: '144px', height: '60px', overflow: 'hidden' }}>
          <img style={{ height: '100%' }} src={product.image} alt="promotion" />
        </Box>,
        product.id,
        categories.find(category => category.value === product.category)?.label ||
          'нет категории',
        product.price,
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
    selectedId,
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
        rowsCount={rowsCount}
        rowsPerPageOptions={[2, 5, 10, 25]}
        onPageChange={onChangePage}
        onRowsPerPageChange={event => onChangeRowsPerPage(+event.target.value)}
      />
    </Box>
  );
}
