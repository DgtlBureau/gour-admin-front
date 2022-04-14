import { ClientRole } from './ClientRole';

export type Client = {
  id: number;
  name: string;
  phone: string;
  isApproved: boolean;
  role: ClientRole;
};
