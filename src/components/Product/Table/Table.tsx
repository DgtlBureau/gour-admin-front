import React, { useState } from 'react';

import { Box } from 'components/UI/Box/Box';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Table } from 'components/UI/Table/Table';

import { ProductTableDto } from 'types/dto/table/products.dto';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { TabsKeys } from '../SelectForm/types';

const titleList = ['Фото', 'Название', 'Цена', 'Действие'];

export type ProductsTableProps = {
  products: ProductTableDto[];
  categories: {
    label: string;
    id: number;
  }[];
  page: number;
  rowsCount: number;
  onChangePage: (_: unknown, newPage: number) => void;
  rowsPerPage: number;
  onChangeRowsPerPage: (rowPerPage: number) => void;
  onEdit(id: number): void;
  onRemove(product: ProductTableDto): void;
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
  const [selectedId, setSelectedId] = useState<TabsKeys>('all');

  const tabsOptions = [
    {
      value: 'all',
      label: 'Всё',
    } as const,
    ...categories.map(category => ({
      value: category.id,
      label: category.label,
    })),
  ];

  const changeTab = (id: TabsKeys) => setSelectedId(id);

  const rows = products
    .filter(product => product.categoriesIds.includes(+selectedId) || selectedId === 'all')
    .map((product, i) => ({
      id: i,
      cells: [
        <Box sx={{ maxWidth: '144px', height: '60px', overflow: 'hidden' }}>
          <img style={{ height: '100%' }} src={product.image} alt='product' />
        </Box>,
        product.title,
        `${product.price}₡`,
        <Box>
          <IconButton onClick={() => onEdit(product.id)} component='symbol'>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onRemove(product)} component='symbol'>
            <DeleteIcon />
          </IconButton>
        </Box>,
      ],
    }));

  const tabs = {
    value: selectedId,
    options: tabsOptions,
    onChange: changeTab,
  };

  return (
    <Box>
      <Table<TabsKeys>
        tabs={tabs}
        rowTitleList={titleList}
        rows={rows}
        rowsPerPage={rowsPerPage}
        page={page}
        rowsCount={rowsCount}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={onChangePage}
        onRowsPerPageChange={event => onChangeRowsPerPage(+event.target.value)}
      />
    </Box>
  );
}
