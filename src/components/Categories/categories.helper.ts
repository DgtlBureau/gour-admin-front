import type { LowLevelCategory } from '../../@types/entities/Category';
import type { SubCategoriesState } from './CreateOrEditForm/types';

export const getSubCategoriesObject = (
  categories: LowLevelCategory[]
): SubCategoriesState =>
  categories.reduce<SubCategoriesState>((acc, category) => {
    const editableCategory = {
      title: category.title.ru,
      id: category.id,
    };
    acc[category.id] = editableCategory;
    return acc;
  }, {});
