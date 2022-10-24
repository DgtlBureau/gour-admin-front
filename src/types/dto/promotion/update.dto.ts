import { Meta } from '../../entities/Meta';
import { TranslatableStringDto } from '../translatable-string.dto';
import { TranslatableTextDto } from '../translatable-text.dto';

export type PromotionUpdateDto = Readonly<
  { id: number } & {
    title?: TranslatableStringDto;
    description?: TranslatableTextDto;
    cardImageId?: number;
    pageImageId?: number;
    discount?: number;
    start?: string;
    end?: string;
    products: number[];
    pageMeta: Meta;
  }
>;
