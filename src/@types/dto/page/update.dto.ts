import { PageMetaDto } from './meta.dto';
import { TranslatableStringDto } from '../translatable-string.dto';

export type PageUpdateDto = Readonly<{
  id: number;
  key?: string;
  info: {
    title?: TranslatableStringDto;
    description?: TranslatableStringDto;
  };
  meta: PageMetaDto;
}>
