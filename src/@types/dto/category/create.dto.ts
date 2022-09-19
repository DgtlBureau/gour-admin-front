import { TranslatableStringDto } from '../translatable-string.dto';

export type CategoryCreateDto = Readonly<{
  title: TranslatableStringDto;
  subCategoriesIds?: number[];
  parentCategoriesIds?: number[];
}>;
