import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import type { TopLevelCategory } from '../../../@types/entities/Category';

import { Box } from '../../UI/Box/Box';
import { Button } from '../../UI/Button/Button';
import { CategoriesTable } from '../Table/Table';
import { Typography } from '../../UI/Typography/Typography';

import { sx } from './ProductType.styles';

type Props = {
  productType: TopLevelCategory;
  onEdit: () => void;
  onDelete: () => void;
  onCreateCategory: () => void;
  onEditCategory: (id: number) => void;
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
          <Typography variant="h6">{productType.title.ru}</Typography>
          <Box sx={sx.buttons}>
            <Button variant="outlined" onClick={onEdit}>
              Редактировать
            </Button>
            <Button variant="outlined" onClick={onDelete}>
              Удалить
            </Button>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <CategoriesTable
          categories={productType.subCategories || []}
          onEdit={onEditCategory}
          onDelete={onDeleteCategory}
        />
        <Box sx={sx.bottomButton}>
          <Button onClick={onCreateCategory}>Создать категорию</Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
