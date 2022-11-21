import { Client } from './Client';
import { Product } from './Product';

export type ProductGrade = {
  id: number;
  product: Product;
  client?: Client;
  value: number;
  comment: string;
  createdAt: string;
  isApproved: boolean | null;
  productId: number;
};
