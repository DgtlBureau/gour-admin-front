import { User } from './User';
import { Product } from './Product';

export type ProductGrade = {
  id: number;
  product: Product;
  client: User;
  value: number;
  comment: string;
  createdAt: string;
  isApproved: boolean;
  productId: number;
};
