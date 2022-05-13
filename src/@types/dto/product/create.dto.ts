import { PageMetaDto } from '../page/meta.dto';
import { PriceDto } from '../price.dto';
import { TranslatableStringDto } from '../translatable-string.dto';

export type ProductCreateDto = Readonly<{
  title: TranslatableStringDto;
  description: TranslatableStringDto;
  images: number[];
  price: PriceDto;
  meta?: PageMetaDto;
  characteristics: Record<string, string>;
  moyskladCode?: number;
  category: number;
  similarProducts?: number[];
  roleDiscounts?: {
    role: number;
    rub?: number;
    eur?: number;
  }[];
}>;
