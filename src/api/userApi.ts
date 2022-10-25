import { UserCreateDto } from 'types/dto/user/create.dto';
import { UserGetListDto } from 'types/dto/user/get-list.dto';
import { User } from 'types/entities/User';

import { Path } from '../constants/routes';
import { commonApi } from './commonApi';

export const userApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getById: builder.query<User, number>({
      query: id => ({
        url: `${Path.USERS}/${id}`,
        method: 'GET',
      }),
      providesTags: (r, e, id) => [{ type: 'User', id }],
    }),
    getAllUsers: builder.query<User[], UserGetListDto>({
      query: () => ({
        url: Path.USERS,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'User', id } as const)), { type: 'User', id: 'LIST' }]
          : [{ type: 'User', id: 'LIST' }],
    }),
    createUser: builder.mutation<void, UserCreateDto>({
      query: body => ({
        url: Path.USERS,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    deleteUser: builder.mutation<void, number>({
      query: id => ({
        url: `${Path.USERS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const { useDeleteUserMutation, useCreateUserMutation, useGetAllUsersQuery, useGetByIdQuery } = userApi;
