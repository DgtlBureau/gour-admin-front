import { TranslatableStringDto } from '../translatable-string.dto';
import { TranslatableTextDto } from '../translatable-text.dto';
import { PageMeta } from '../../entities/PageMeta';

export type PromotionCreateDto = Readonly<{
  title: TranslatableStringDto;
  description: TranslatableTextDto;
  cardImageId?: number;
  pageImageId?: number;
  discount: number;
  start: string,
  end: string;
  products: number[];
  pageMeta: PageMeta
}>;
