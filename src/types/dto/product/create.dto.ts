import { PageMetaDto } from '../page/meta.dto';
import { PriceDto } from '../price.dto';
import { TranslatableStringDto } from '../translatable-string.dto';

export type RoleDiscountDto = {
  role: number;
  value: number;
};

export type ProductCreateDto = Readonly<{
  title: TranslatableStringDto;
  description: TranslatableStringDto;
  images: number[];
  price: PriceDto;
  meta?: PageMetaDto;
  categoryIds: number[];
  similarProducts?: number[];
  moyskladId: string | null;
  roleDiscounts: RoleDiscountDto[];
}>;
