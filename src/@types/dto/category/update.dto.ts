import { TranslatableStringDto } from '../translatable-string.dto';
import { TranslatableTextDto } from '../translatable-text.dto';

export type CategoryUpdateDto = Readonly<
  { id: number } & Partial<{
    title: TranslatableStringDto;
    description: TranslatableTextDto;
    icon: string;
    key: string;
  }>
>;
