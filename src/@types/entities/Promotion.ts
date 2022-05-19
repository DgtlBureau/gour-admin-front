import { PageMeta } from './PageMeta';
import { TranslatableString } from './TranslatableString';
import { TranslatableText } from './TranslatableText';

export type Promotion = {
  id: number;
  title: TranslatableString;
  description: TranslatableText;
  cardImage: File;
  pageImage: File;
  discount: number;
  start: Date;
  end: Date;
  meta: PageMeta
  productIdList: number[];
};
