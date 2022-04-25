import { PageMetaDto } from './meta.dto';
import { TranslatableStringDto } from '../translatable-string.dto';

export type PageCreateDto = Readonly<{
  key: string;
  info: {
    title?: TranslatableStringDto;
    description?: TranslatableStringDto;
  };
  meta: PageMetaDto;
}>
