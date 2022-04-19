import { TranslatableStringDto } from '../translatable-string.dto';
import { TranslatableTextDto } from '../translatable-text.dto';

export type CategoryCreateDto = Readonly<{
  title: TranslatableStringDto;
  description: TranslatableTextDto;
  icon: string;
  key: string;
}>;
