import { TranslatableString } from 'types/entities/TranslatableString';

export type CategoryCreateDto = Readonly<{
  title: TranslatableString;
  hasDiscount?: boolean;
  subCategoriesIds?: number[];
  parentCategoriesIds?: number[];
}>;
