import { Roles } from 'constants/users/roles';

import { Client } from 'types/entities/Client';
import { User } from 'types/entities/User';

export function formatUsersList(usersList: User[]) {
  return usersList
    .map((user: any) => {
      // FIXME:
      const { login, role, apiUserUuid: uuid, createdAt, firstName, lastName } = user;
      const name = `${firstName || ''} ${lastName || ''}`;
      return {
        login,
        name,
        role: (role?.key as Roles) || '',
        uuid,
        createdAt,
      };
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
}

export function formatClientsList(usersList: Client[]) {
  return usersList
    .map(user => {
      const { id, role, phone, createdAt, firstName, lastName } = user;
      const name = `${firstName || ''} ${lastName || ''}`;
      return {
        login: phone,
        name,
        role: (role?.key as Roles) || '',
        uuid: String(id),
        createdAt,
        balance: 0,
      };
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
}
