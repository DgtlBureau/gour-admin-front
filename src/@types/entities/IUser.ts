import { Product } from './Product';
import { UserRole } from './UserRole';

export interface IUser {
  id: number;
  apiUserUuid: string;
  name: string;
  phone: string;
  role: UserRole;
  isApproved: boolean;
  additionalInfo: Record<string, string | number>;
  favorites: Product[];
}
