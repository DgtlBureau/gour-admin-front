import { ClientRole } from './ClientRole';

export type Client = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  isApproved: boolean;
  role: ClientRole;
  createdAt: string;
};
