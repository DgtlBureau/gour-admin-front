import { LowLevelCategory } from '../../../@types/entities/Category';

export type EditableCategory = {
  title: string;
  id?: number;
};

export type SubCategoriesState = Record<number, EditableCategory>;

export type CreateFormType = {
  title: string;
  subCategories?: SubCategoriesState;
};
