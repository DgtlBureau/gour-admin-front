import { TranslatableStringDto } from '../translatable-string.dto';
import { PageMetaDto } from './meta.dto';

export type PageUpdateDto = Readonly<{
  id: number;
  key?: string;
  info: {
    title?: TranslatableStringDto;
    description?: TranslatableStringDto;
  };
  bannerImg?: number;
  meta: PageMetaDto;
}>;
