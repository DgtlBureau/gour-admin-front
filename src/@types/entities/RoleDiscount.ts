import { Product } from './Product';
import { UserRole } from './UserRole';

export type RoleDiscount = {
  product: Product;
  role: UserRole;
  value: number;
  rub: number;
  eur: number;
};
