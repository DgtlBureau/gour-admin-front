import { TranslatableStringDto } from '../translatable-string.dto';

export type PageMetaDto = Readonly<{
  metaTitle?: TranslatableStringDto;
  metaDescription?: TranslatableStringDto;
  metaKeywords?: TranslatableStringDto;
  isIndexed?: boolean;
}>;
