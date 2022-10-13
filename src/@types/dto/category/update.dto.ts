import { TranslatableStringDto } from '../translatable-string.dto';

export type CategoryUpdateDto = Readonly<
  { id: number } & Partial<{
    title: TranslatableStringDto;
    hasDiscount?: boolean;
    subCategoriesIds?: number[];
    parentCategoriesIds?: number[];
  }>
>;
