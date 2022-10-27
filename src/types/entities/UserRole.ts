import { Base } from './Base';

export type UserRole = Base & {
  description: string;
  key: string;
};
