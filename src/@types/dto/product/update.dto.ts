import { PageMetaDto } from '../page/meta.dto';
import { PriceDto } from '../price.dto';
import { TranslatableStringDto } from '../translatable-string.dto';

export type ProductUpdateDto = Readonly<
  {
    id: number;
  } & Partial<{
    title: TranslatableStringDto;
    description: TranslatableStringDto;
    images: number[];
    price: PriceDto;
    meta?: PageMetaDto;
    // characteristics: Record<string, string | number>; // FIXME:
    moyskladCode?: number;
    category: number; // FIXME:
    similarProducts?: number[];
    roleDiscounts?: {
      role: number;
      rub?: number;
      eur?: number;
    }[];
  }>
>;
