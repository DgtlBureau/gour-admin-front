import { TranslatableString } from './TranslatableString';
import { TranslatableText } from './TranslatableText';
import { Image } from './Image';
import { TopLevelCategory } from './Category';
import { ProductGrade } from './ProductGrade';
import { ProductModification } from './ProductModification';
import { Price } from './Price';
import { RoleDiscount } from './RoleDiscount';
import { Meta } from './Meta';

export type Product = {
  id: number;
  title: TranslatableString;
  description: TranslatableText;
  moyskladCode: number;
  images: Image[];
  category: TopLevelCategory[];
  productGrades: ProductGrade[];
  grade: number;
  similarProducts: Product[];
  pieces: ProductModification[];
  price: Price;
  roleDiscounts: RoleDiscount[];
  categories: TopLevelCategory[];
  meta: Meta;
  moyskladId: number | null;
};
