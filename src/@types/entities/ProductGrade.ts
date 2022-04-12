import { IUser } from './IUser';
import { Product } from './Product';

export type ProductGrade = {
  product: Product;
  client: IUser;
  value: number;
  comment: string;
  productId: number;
};
