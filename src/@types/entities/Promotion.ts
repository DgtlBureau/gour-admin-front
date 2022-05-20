import { Meta } from './Meta';
import { Image } from './Image';
import { TranslatableString } from './TranslatableString';
import { TranslatableText } from './TranslatableText';

export type Promotion = {
  id: number;
  title: TranslatableString;
  description: TranslatableText;
  cardImage: Image;
  pageImage: Image;
  discount: number;
  start: Date;
  end: Date;
  meta: Meta
  productIdList: number[];
};
