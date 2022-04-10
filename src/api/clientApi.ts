import { commonApi } from './commonApi';
import { Path } from '../constants/routes';
import { ClientCreateDto } from '../@types/dto/client/create.dto';
import { Client } from '../@types/entities/Client';
import { ClientGetListDto } from '../@types/dto/client/get-list.dto';

export const clientApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getById: builder.query<Client, number>({
      query: id => ({
        url: `${Path.USERS}/${id}`,
        method: 'GET',
      }),
    }),
    getAll: builder.query<Client[], ClientGetListDto>({
      query: () => ({
        url: Path.USERS,
        method: 'GET',
      }),
    }),
    create: builder.mutation<void, ClientCreateDto>({
      query: body => ({
        url: Path.USERS,
        method: 'POST',
        body,
      }),
    }),
    delete: builder.mutation<void, number>({
      query: id => ({
        url: `${Path.USERS}/${id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useDeleteMutation, useCreateMutation, useGetAllQuery, useGetByIdQuery } =
  clientApi;
