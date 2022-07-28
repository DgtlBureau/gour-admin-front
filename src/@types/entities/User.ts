import { Product } from './Product';
import { UserRole } from './UserRole';

export type User = {
  apiUserUuid: string;
  firstName: string;
  lastName: string;
  login: string;
  role: UserRole;
  isApproved: boolean;
  additionalInfo: Record<string, string | number>;
  favorites: Product[];
  createdAt: string;
};
