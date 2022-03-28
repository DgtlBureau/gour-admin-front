import { Product } from './Product';
import { ClientRole } from './ClientRole';

export type RoleDiscount = {
  product: Product;
  role: ClientRole;
  value: number;
  rub: number;
  eur: number;
};
