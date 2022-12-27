import { Roles } from 'constants/users/roles';

import { Base } from './Base';

export type UserRole = Base & {
  description: string;
  key: Roles;
};
