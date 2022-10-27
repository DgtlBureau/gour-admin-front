import { UserRole } from 'types/entities/UserRole';

import { Path } from '../constants/routes';
import { commonApi } from './commonApi';

export const userRoleApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getUserRoleList: builder.query<UserRole[], void>({
        query() {
          return {
            method: 'GET',
            url: Path.ROLES,
          };
        },
      }),
    };
  },
});

export const { useGetUserRoleListQuery } = userRoleApi;
