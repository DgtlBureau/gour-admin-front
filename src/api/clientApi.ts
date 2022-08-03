import { Client } from '../@types/entities/Client';
import { commonApi } from './commonApi';
import { Path } from '../constants/routes';

export const clientApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getClientsList: builder.query<Client[], void>({
        query() {
          return {
            method: 'GET',
            url: Path.CLIENTS,
          };
        },
        providesTags: result =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'Client', id } as const)),
                { type: 'Client', id: 'LIST' },
              ]
            : [{ type: 'Client', id: 'LIST' }],
      }),
      getClient: builder.query<Client, number>({
        query(id) {
          return {
            method: 'GET',
            url: `${Path.CLIENTS}/${id}`,
          };
        },
        providesTags: (r, e, id) => [{ type: 'Client', id }],
      }),
      updateClient: builder.mutation<Client, Partial<Client> & Pick<Client, 'id'>>({
        query(client) {
          return {
            method: 'PUT',
            url: `${Path.CLIENTS}/${client.id}`,
            body: client,
          };
        },
        invalidatesTags: (r, e, { id }) => [{ type: 'Client', id }],
      }),
      deleteClient: builder.mutation<Client, number>({
        query(id) {
          return {
            method: 'DELETE',
            url: `${Path.CLIENTS}/${id}`,
          };
        },
        invalidatesTags: [{ type: 'Client', id: 'LIST' }],
      }),
    };
  },
});

export const {
  useGetClientQuery,
  useGetClientsListQuery,
  useDeleteClientMutation,
  useUpdateClientMutation,
} = clientApi;
