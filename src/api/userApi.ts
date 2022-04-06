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
    getAllUsers: builder.query<IUser[], UserGetListDto>({
      query: () => ({
        url: `${Path.USERS}`,
        method: 'GET',
      }),
    }),
    create: builder.mutation<void, UserCreateDto>({
      query: body => ({
        url: Path.USERS,
        method: 'POST',
        body,
      }),
    }),
    deleteUser: builder.mutation<void, number>({
      query: id => ({
        url: `${Path.USERS}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useCreateMutation,
  useGetAllUsersQuery,
  useGetByIdQuery,
} = userApi;
