import { Base } from './Base';
import { UserRole } from './UserRole';

export type User = {
  name: string;
  login: string;
  roles: UserRole[];
  isApproved: boolean;
} & Base;
