import { IUser } from './IUser';
import { Product } from './Product';

export type ProductGrade = {
  id: number;
  product: Product;
  client: IUser;
  value: number;
  comment: string;
  isApproved: boolean;
  productId: number;
};
