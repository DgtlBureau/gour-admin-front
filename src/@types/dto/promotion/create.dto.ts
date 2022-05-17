import { TranslatableStringDto } from '../translatable-string.dto';
import { TranslatableTextDto } from '../translatable-text.dto';
import { PageMeta } from '../../entities/PageMeta';

export type PromotionCreateDto = Readonly<{
  title: TranslatableStringDto;
  description: TranslatableTextDto;
  cardImageId: {
    ru: number,
    en: number;
  };
  pageImageId: {
    ru: number,
    en: number;
  };
  discount: number;
  start: string,
  end: string;
  products: number[];
  pageMeta: PageMeta
}>;
