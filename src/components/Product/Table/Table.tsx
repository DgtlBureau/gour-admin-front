import React, { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Box } from '../../UI/Box/Box';
import { IconButton } from '../../UI/IconButton/IconButton';
import { Table } from '../../UI/Table/Table';
import { Options } from '../../../constants/tabs';

import defaultProductImg from '../../../assets/images/default-product-image.svg';

export type ProductsTableProps = {
  products: {
    id: number;
    image?: string;
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
  const [tabValue, setTabValue] = useState<string>(Options.ALL);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const titleList = ['Фото', 'Название', 'Категория', 'Цена', 'Действие'];

  const tabsOptions = [
    {
      value: Options.ALL,
      label: 'Всё',
    },
    ...categories.map(category => ({
      value: category.value,
      label: category.label,
    })),
  ];

  const changeTab = (val: string) => setTabValue(val);

  const changePage = (_: unknown, newPage: number) => setPage(newPage);

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = products
    .filter(product => product.category === tabValue || tabValue === Options.ALL)
    .map((product, i) => ({
      id: i,
      cells: [
        <Box sx={{ maxWidth: '144px', height: '60px' }}>
          <img
            style={{ height: '100%', objectFit: 'cover' }}
            src={product.image || defaultProductImg}
            alt="promotion"
          />
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
    value: tabValue,
    options: tabsOptions,
    onChange: changeTab,
  };

  return (
    <Box>
      <Table
        tabs={tabs}
        rowTitleList={titleList}
        rows={rows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={changePage}
        onRowsPerPageChange={changeRowsPerPage}
      />
    </Box>
  );
}
