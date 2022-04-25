import { Client } from '../@types/entities/Client';
import { commonApi } from './commonApi';

export const clientApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getClientsList: builder.query<Client[], void>({
        query() {
          return {
            method: 'get',
            url: 'clients',
          };
        },
        providesTags: result => (result ?
          [
            ...result.map(({ id }) => ({ type: 'Client', id } as const)),
            { type: 'Client', id: 'LIST' },
          ] :
          [{ type: 'Client', id: 'LIST' }]),
      }),
      getClient: builder.query<Client, number>({
        query(id) {
          return {
            method: 'get',
            url: `clients/${id}`,
          };
        },
        providesTags: (result, error, id) => [{ type: 'Client', id }],
      }),
      updateClient: builder.mutation<Client, Partial<Client> & Pick<Client, 'id'>>({
        query(client) {
          return {
            method: 'put',
            url: `clients/${client.id}`,
            body: client,
          };
        },
        invalidatesTags: (r, e, { id }) => [{ type: 'Client', id }],
      }),
      deleteClient: builder.mutation<Client, number>({
        query(id) {
          return {
            method: 'delete',
            url: `clients/${id}`,
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
