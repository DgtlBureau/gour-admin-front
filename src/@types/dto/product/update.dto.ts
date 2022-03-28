import { ImageDto } from '../image.dto';
import { PageMetaDto } from '../page-meta.dto';
import { PriceDto } from '../price.dto';
import { TranslatableStringDto } from '../translatable-string.dto';

export type ProductUpdateDto = Readonly<
  {
    id: number;
  } & Partial<{
    title: TranslatableStringDto;
    description: TranslatableStringDto;
    images: ImageDto[];
    price: PriceDto;
    meta?: PageMetaDto;
    characteristics: Record<string, string | number>;
    moyskladCode?: number;
    category: number;
    similarProducts?: number[];
  }>
>;
