import { commonApi } from './commonApi';
import { User } from '../@types/entities/User';
import { SignInDto } from '../@types/dto/auth/signin.dto';
import { Tokens } from '../@types/dto/auth/tokens.dto';
import { ForgotPasswordDto } from '../@types/dto/auth/forgot-password.dto';
import { RestorePasswordDto } from '../@types/dto/auth/restore-password.dto';
import { SignupUserDto } from '../@types/dto/auth/signup-user.dto';

const ROLE_HASH: Record<'admin'|'moderator', string> = {
  admin: process.env.REACT_APP_ROLE_ADMIN_CODE as string,
  moderator: process.env.REACT_APP_ROLE_MODERATOR_CODE as string,
};

export const authApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: '/auth/currentUser',
        method: 'GET',
      }),
    }),
    refresh: builder.query<Tokens, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),
    signout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/signout',
        method: 'POST',
      }),
    }),
    signin: builder.mutation<Tokens, SignInDto>({
      query: body => ({
        url: '/auth/signin',
        method: 'POST',
        body,
      }),
    }),
    signupWithoutPassword: builder.mutation<Tokens, SignupUserDto>({
      query: body => ({
        url: '/auth/signup-without-password',
        method: 'POST',
        body: {
          email: body.email,
          role: ROLE_HASH[body.role],
        },
      }),
    }),
    forgotPassword: builder.mutation<void, ForgotPasswordDto>({
      query: body => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    restorePassword: builder.mutation<void, RestorePasswordDto>({
      query: body => ({
        url: '/auth/restore-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useSigninMutation,
  useSignoutMutation,
  useForgotPasswordMutation,
  useRestorePasswordMutation,
  useSignupWithoutPasswordMutation,
} = authApi;
