import { Client } from './Client';
import { Product } from './Product';

export type ProductGrade = {
  product: Product;
  client: Client;
  value: number;
  comment: string;
  productId: number;
};
