import { TopLevelCategory } from './Category';
import { Image } from './Image';
import { Meta } from './Meta';
import { Price } from './Price';
import { ProductGrade } from './ProductGrade';
import { ProductModification } from './ProductModification';
import { RoleDiscount } from './RoleDiscount';
import { TranslatableString } from './TranslatableString';
import { TranslatableText } from './TranslatableText';

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
