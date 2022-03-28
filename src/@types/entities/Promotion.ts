import { Image } from './Image';
import { Product } from './Product';
import { TranslatableString } from './TranslatableString';
import { TranslatableText } from './TranslatableText';

export type Promotion = {
  title: TranslatableString;
  description: TranslatableText;
  cardImage: Image;
  pageImage: Image;
  discount: number;
  start: Date;
  end: Date;
  products: Product[];
};
