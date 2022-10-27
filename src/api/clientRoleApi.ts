import { ClientRole } from 'types/entities/ClientRole';

import { Path } from '../constants/routes';
import { commonApi } from './commonApi';

export const clientRoleApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getClientRoleList: builder.query<ClientRole[], void>({
        query() {
          return {
            method: 'GET',
            url: Path.CLIENT_ROLES,
          };
        },
      }),
    };
  },
});

export const { useGetClientRoleListQuery } = clientRoleApi;
