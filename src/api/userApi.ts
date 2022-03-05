import { commonApi } from './commonApi';
import { RuntimeUser, User } from '../@types/entities/User';
import { SignInDto } from '../@types/dto/signin.dto';
import { RuntimeTokens, Tokens } from '../@types/dto/tokens.dto';
import { ForgotPasswordDto } from '../@types/dto/forgot-password.dto';
import { RestorePasswordDto } from '../@types/dto/restore-password.dto';

export const userApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: '/auth/currentUser',
        method: 'GET',
        runtimeType: RuntimeUser,
      }),
    }),
    refresh: builder.query<Tokens, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
        runtimeType: RuntimeTokens,
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
        runtimeType: RuntimeTokens,
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
} = userApi;
