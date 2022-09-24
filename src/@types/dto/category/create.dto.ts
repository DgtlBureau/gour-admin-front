import { TranslatableString } from '../../entities/TranslatableString';

export type CategoryCreateDto = Readonly<{
  title: TranslatableString;
  subCategoriesIds?: number[];
  parentCategoriesIds?: number[];
}>;
