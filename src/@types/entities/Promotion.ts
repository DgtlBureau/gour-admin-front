import { Meta } from './Meta';
import { Image } from './Image';
import { TranslatableString } from './TranslatableString';
import { TranslatableText } from './TranslatableText';
import { Product } from './Product';

export type Promotion = {
  id: number;
  title: TranslatableString;
  description: TranslatableText;
  cardImage: Image;
  pageImage: Image;
  discount: number;
  start: Date;
  end: Date;
  pageMeta: Meta;
  products: Product[];
};
