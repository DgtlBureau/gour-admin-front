import { commonApi } from './commonApi';
import { Path } from '../constants/routes';
import { UserCreateDto } from '../@types/dto/user/create.dto';
import { UserGetListDto } from '../@types/dto/user/get-list.dto';
import { IUser } from '../@types/entities/IUser';

export const userApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getById: builder.query<IUser, number>({
      query: id => ({
        url: `${Path.USERS}/${id}`,
        method: 'GET',
      }),
    }),
    getAll: builder.query<IUser[], UserGetListDto>({
      query: () => ({
        url: Path.USERS,
        method: 'GET',
      }),
    }),
    createUser: builder.mutation<void, UserCreateDto>({
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

export const {
  useDeleteMutation,
  useCreateUserMutation,
  useGetAllQuery,
  useGetByIdQuery,
} = userApi;
