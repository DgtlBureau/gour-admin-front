import { commonApi } from './commonApi';
import { UserCreateDto } from '../@types/dto/user/create.dto';
import { UserGetListDto } from '../@types/dto/user/get-list.dto';
import { IUser } from '../@types/entities/IUser';

const USERS_API_PATH = '/auth/apiUsers';
const ROLES = ['ADMIN', 'CLIENT', 'MODERATOR'];

export const userApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getById: builder.query<IUser, number>({
      query: id => ({
        url: `${USERS_API_PATH}/${id}`,
        method: 'GET',
      }),
    }),
    getAllUsers: builder.query<IUser[], UserGetListDto>({
      query: () => ({
        url: USERS_API_PATH,
        method: 'GET',
        params: {
          roles: JSON.stringify(ROLES),
        },
      }),
      transformResponse(users: (IUser & {roles: IUser['role'][]})[]) {
        return users.map(user => ({
          ...user,
          role: user.roles.filter(it => ROLES.includes(it.key))[0],
        }));
      },
    }),
    create: builder.mutation<void, UserCreateDto>({
      query: body => ({
        url: USERS_API_PATH,
        method: 'POST',
        body,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: id => ({
        url: `${USERS_API_PATH}/${id}`,
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
