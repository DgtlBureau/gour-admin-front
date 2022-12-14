import { useState } from 'react';

import { Grid } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Checkbox } from 'components/UI/Checkbox/Checkbox';
import { IconButton } from 'components/UI/IconButton/IconButton';

import { AnyLevelCategory, LowLevelCategory, MidLevelCategory, TopLevelCategory } from 'types/entities/Category';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import sx from './CategorySelectForm.styles';

export const isCategorySelected = (category: AnyLevelCategory, selected: number[]) => selected.includes(category.id);

export const isMidCategorySelected = (category: MidLevelCategory, selected: number[]) =>
  category.subCategories.every(lowCategory => isCategorySelected(lowCategory, selected));

export const isTopCategorySelected = (category: TopLevelCategory, selected: number[]) =>
  category.subCategories.every(midCategory => isMidCategorySelected(midCategory, selected));

export type CategorySelectFormProps = {
  categories: TopLevelCategory[];
  selected?: number[];
  onChange: (selected: number[]) => void;
};

export function CategorySelectForm({ categories, selected = [], onChange }: CategorySelectFormProps) {
  const [openedCategoryId, setOpenedCategoryId] = useState<number | null>(null);
  const [openedSubCategoryId, setOpenedSubCategoryId] = useState<number | null>(null);

  const openCategory = (categoryId: number) => {
    const isOpened = categoryId === openedCategoryId;

    setOpenedCategoryId(isOpened ? null : categoryId);

    if (isOpened) setOpenedSubCategoryId(null);
  };

  const openSubCategory = (subCategoryId: number) => {
    const isOpened = subCategoryId === openedSubCategoryId;

    setOpenedSubCategoryId(isOpened ? null : subCategoryId);
  };

  const selectCategory = (category: AnyLevelCategory) => {
    const isSelected = isCategorySelected(category, selected);
    const newSelected = isSelected ? selected.filter(id => id !== category.id) : [...selected, category.id];

    onChange(newSelected);
  };

  const selectCategories = (anyCategories: AnyLevelCategory[]) => {
    const isSelected = anyCategories.every(category => isCategorySelected(category, selected));

    const newSelected = anyCategories.reduce((ids, category) => {
      const selectedIds = isSelected ? ids.filter(id => id !== category.id) : [...ids, category.id];

      return selectedIds;
    }, selected);

    onChange(newSelected);
  };

  const selectMidCategory = (category: MidLevelCategory) => selectCategories(category.subCategories);

  const selectTopCategory = (category: TopLevelCategory) => {
    const newSelected = category.subCategories.reduce(
      (lowCategories, midCategory) => [...lowCategories, ...midCategory.subCategories],
      [] as LowLevelCategory[],
    );

    selectCategories(newSelected);
  };

  return (
    <Grid container>
      {categories.map(topCategory => {
        const isOpenedCategory = topCategory.id === openedCategoryId;

        return (
          <Grid container item xs={8}>
            <Box sx={sx.categoryItem}>
              <Checkbox
                checked={isTopCategorySelected(topCategory, selected)}
                label={topCategory.title.ru}
                onChange={() => selectTopCategory(topCategory)}
              />

              <IconButton onClick={() => openCategory(topCategory.id)}>
                <ExpandMoreIcon sx={{ ...sx.arrow, ...(isOpenedCategory && sx.rotatedArrow) }} />
              </IconButton>
            </Box>

            {isOpenedCategory &&
              topCategory.subCategories.map(midCategory => {
                const isOpenedSubCategory = midCategory.id === openedSubCategoryId;

                return (
                  <Grid container item xs={12} sx={sx.subCategoryGrid}>
                    <Box sx={sx.categoryItem}>
                      <Checkbox
                        checked={isMidCategorySelected(midCategory, selected)}
                        label={midCategory.title.ru}
                        onChange={() => selectMidCategory(midCategory)}
                      />

                      <IconButton onClick={() => openSubCategory(midCategory.id)}>
                        <ExpandMoreIcon sx={{ ...sx.arrow, ...(isOpenedSubCategory && sx.rotatedArrow) }} />
                      </IconButton>
                    </Box>

                    {isOpenedSubCategory &&
                      midCategory.subCategories.map(lowCategory => (
                        <Grid item xs={12} sx={sx.subCategoryGrid}>
                          <Checkbox
                            checked={isCategorySelected(lowCategory, selected)}
                            label={lowCategory.title.ru}
                            onChange={() => selectCategory(lowCategory)}
                          />
                        </Grid>
                      ))}
                  </Grid>
                );
              })}
          </Grid>
        );
      })}
    </Grid>
  );
}
