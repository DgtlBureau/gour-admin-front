import { Product } from './Product';
import { UserRole } from './UserRole';

export interface IUser {
  apiUserUuid: string;
  role: UserRole;
  isApproved: boolean;
  additionalInfo: Record<string, string | number>;
  favorites: Product[];
}
