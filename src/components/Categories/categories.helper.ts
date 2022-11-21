import type { LowLevelCategory } from 'types/entities/Category';

import type { EditableCategory, SubCategoriesState } from './CreateOrEditForm/types';

export const getSubCategoriesObject = (categories: LowLevelCategory[]): SubCategoriesState =>
  categories.reduce<SubCategoriesState>((acc, category) => {
    const editableCategory = {
      title: category.title.ru,
      id: category.id,
    };
    acc[category.id] = editableCategory;
    return acc;
  }, {});

export function getEditedCategories(newCategories: EditableCategory[], oldCategories: LowLevelCategory[]) {
  return newCategories.filter(category => {
    if (!category.id) return false;
    const oldCategory = oldCategories.find(it => it.id === category.id);
    if (!oldCategory) return false;
    return oldCategory.title.ru !== category.title;
  });
}
