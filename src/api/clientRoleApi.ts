import { ClientRole } from '../@types/entities/ClientRole';
import { commonApi } from './commonApi';
import { Path } from '../constants/routes';

export const clientRoleApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getClientRolesList: builder.query<ClientRole[], void>({
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

export const { useGetClientRolesListQuery } = clientRoleApi;
