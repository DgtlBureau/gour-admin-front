import { Base } from './Base';
import { TopLevelCategory } from './Category';
import { Image } from './Image';
import { Meta } from './Meta';
import { Price } from './Price';
import { ProductGrade } from './ProductGrade';
import { ProductModification } from './ProductModification';
import { RoleDiscount } from './RoleDiscount';
import { TranslatableString } from './TranslatableString';
import { TranslatableText } from './TranslatableText';

export type Product = Base & {
  title: TranslatableString;
  description: TranslatableText;
  images: Image[];
  category: TopLevelCategory[];
  productGrades: ProductGrade[];
  grade: number;
  similarProducts: Product[];
  pieces: ProductModification[];
  price: Price | null;
  roleDiscounts: RoleDiscount[];
  categories: TopLevelCategory[];
  moyskladId: number | null;
  meta: Meta;
};
