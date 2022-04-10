import { ImageDto } from '../image.dto';
import { TranslatableStringDto } from '../translatable-string.dto';
import { TranslatableTextDto } from '../translatable-text.dto';

export type PromotionCreateDto = Readonly<{
  title: TranslatableStringDto;
  description: TranslatableTextDto;
  cardImage: ImageDto;
  pageImage: ImageDto;
  discount: number;
  end: string;
  products: number[];
}>;
