import { TranslatableString } from './TranslatableString';
import { TranslatableText } from './TranslatableText';
import { Image } from './Image';
import { Category } from './Category';
import { ProductGrade } from './ProductGrade';
import { ProductModification } from './ProductModification';
import { Price } from './Price';
import { RoleDiscount } from './RoleDiscount';
import { PageMeta } from './PageMeta';

export type Product = {
  id: number;
  title: TranslatableString;
  description: TranslatableText;
  moyskladCode: number;
  images: Image[];
  category: Category;
  productGrades: ProductGrade[];
  grade: number;
  similarProducts: Product[];
  pieces: ProductModification[];
  price: Price;
  roleDiscounts: RoleDiscount[];
  characteristics: Record<string, string>;
  meta: PageMeta;
};
