import { TranslatableStringDto } from '../translatable-string.dto';
import { PageMetaDto } from './meta.dto';

export type PageCreateDto = Readonly<{
  key: string;
  info: {
    title?: TranslatableStringDto;
    description?: TranslatableStringDto;
  };
  bannerImg?: number;
  meta: PageMetaDto;
}>;
