import { Product } from './Product';
import { ClientRole } from './ClientRole';

export type Client = {
  apiUserUuid: string;
  role: ClientRole;
  isApproved: boolean;
  additionalInfo: Record<string, string | number>;
  favorites: Product[];
};
