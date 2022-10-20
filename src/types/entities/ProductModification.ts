import { Product } from './Product';
import { TranslatableString } from './TranslatableString';
import { Warehouse } from './Warehouse';

export type ProductModification = {
  title: TranslatableString;
  weight: number;
  quantityInStock: number;
  moyskladCode: number;
  product: Product;
  warehouse: Warehouse;
};
