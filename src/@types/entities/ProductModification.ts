import { Product } from './Product';
import { Warehouse } from './Warehouse';
import { TranslatableString } from './TranslatableString';

export type ProductModification = {
  title: TranslatableString;
  weight: number;
  quantityInStock: number;
  moyskladCode: number;
  product: Product;
  warehouse: Warehouse;
};
