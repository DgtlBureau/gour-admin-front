import { ClientRole } from '../@types/entities/ClientRole';
import { commonApi } from './commonApi';

export const clientRoleApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getClientRolesList: builder.query<ClientRole[], void>({
        query() {
          return {
            method: 'get',
            url: 'clientRoles',
          };
        },
      }),
    };
  },
});

export const { useGetClientRolesListQuery } = clientRoleApi;
