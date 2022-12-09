import React from 'react';

import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import type { MidLevelCategory, TopLevelCategory } from 'types/entities/Category';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { CategoriesTable } from '../Table/Table';
import { sx } from './ProductType.styles';

type Props = {
  productType: TopLevelCategory;
  onEdit: (productTypeId: number) => void;
  onDelete: (productTypeId: number) => void;
  onCreateCategory: (productType: TopLevelCategory) => void;
  onEditCategory: (category: MidLevelCategory, productType: TopLevelCategory) => void;
  onDeleteCategory: (id: number) => void;
};

export function CategoryProductType({
  productType,
  onEdit,
  onDelete,
  onCreateCategory,
  onEditCategory,
  onDeleteCategory,
}: Props) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={sx.header}>
          <Typography variant='h6'>{productType.title.ru}</Typography>
          <Box sx={sx.buttons}>
            <Button
              variant='outlined'
              onClick={e => {
                e.stopPropagation();
                onEdit(productType.id);
              }}
            >
              Редактировать
            </Button>
            <Button
              variant='outlined'
              onClick={e => {
                e.stopPropagation();
                onDelete(productType.id);
              }}
            >
              Удалить
            </Button>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <CategoriesTable
          categories={productType.subCategories}
          onEdit={category => onEditCategory(category, productType)}
          onDelete={onDeleteCategory}
        />
        <Box sx={sx.bottomButton}>
          <Button onClick={() => onCreateCategory(productType)}>Создать категорию</Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
