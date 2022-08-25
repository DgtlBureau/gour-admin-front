import { commonApi } from './commonApi';
import { UserCreateDto } from '../@types/dto/user/create.dto';
import { UserGetListDto } from '../@types/dto/user/get-list.dto';
import { User } from '../@types/entities/User';
import { Path } from '../constants/routes';

const ROLES = ['ADMIN', 'CLIENT', 'MODERATOR'];

export const userApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getById: builder.query<User, number>({
      query: id => ({
        url: `${Path.USERS}/${id}`,
        method: 'GET',
      }),
    }),
    getAllUsers: builder.query<User[], UserGetListDto>({
      query: () => ({
        url: Path.USERS,
        method: 'GET',
        params: {
          roles: JSON.stringify(ROLES),
        },
      }),
      transformResponse(users: (User & { roles: User['role'][] })[]) {
        return users.map(user => ({
          ...user,
          role: user.roles.filter(it => ROLES.includes(it.key))[0],
        }));
      },
    }),
    createUser: builder.mutation<void, UserCreateDto>({
      query: body => ({
        url: Path.USERS,
        method: 'POST',
        body,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: id => ({
        url: `${Path.USERS}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetByIdQuery,
} = userApi;
