import { Product } from './Product';
import { User } from './User';

export type ProductGrade = {
  id: number;
  product: Product;
  client?: User;
  value: number;
  comment: string;
  createdAt: string;
  isApproved: boolean | null;
  productId: number;
};
