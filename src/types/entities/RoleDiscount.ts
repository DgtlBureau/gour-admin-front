import { Base } from './Base';
import { ClientRole } from './ClientRole';

export type RoleDiscount = Base & {
  role: ClientRole;
  value: number;
};
