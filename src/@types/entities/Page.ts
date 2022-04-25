import { PageMeta } from './PageMeta';
import { TranslatableString } from './TranslatableString';

export type Page = {
  id: number;
  key: string;
  info: {
    title: TranslatableString;
    description: TranslatableString;
  };
  meta: PageMeta;
}
