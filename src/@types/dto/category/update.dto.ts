import { TranslatableStringDto } from '../translatable-string.dto';

export type CategoryUpdateDto = Readonly<
  { id: number } & Partial<{
    title: TranslatableStringDto;
    subCategoriesIds?: number[];
    parentCategoriesIds?: number[];
  }>
>;
