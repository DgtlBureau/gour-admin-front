import { Product } from '../../entities/Product';

export type ProductGradeCreateDto = Readonly<{
  product: Product['id'];
  value: number;
  comment: string;
}>;
