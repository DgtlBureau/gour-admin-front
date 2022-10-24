import { PageMetaDto } from '../page/meta.dto';
import { TranslatableStringDto } from '../translatable-string.dto';

export type ProductCreateDto = Readonly<{
  title: TranslatableStringDto;
  description: TranslatableStringDto;
  images: number[];
  meta?: PageMetaDto;
  categoryIds: number[];
  similarProducts?: number[];
  moyskladId: string | null;
}>;
