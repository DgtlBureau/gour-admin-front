import { Roles } from 'constants/users/roles';

import { Base } from './Base';

export type ClientRole = Base & {
  title: string;
  key: Roles;
};
