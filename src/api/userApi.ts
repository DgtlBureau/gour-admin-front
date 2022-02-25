import { commonApi } from './commonApi';
import { RuntimeUser, User } from '../@types/entities/User';
import { SignInDto } from '../@types/dto/signin.dto';
import { RuntimeTokens, Tokens } from '../@types/dto/tokens.dto';

export const userApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: '/auth/currentUser',
        method: 'GET',
        runtimeType: RuntimeUser,
      }),
    }),
    signin: builder.mutation<Tokens, SignInDto>({
      query: body => ({
        url: '/auth/signin',
        method: 'POST',
        body,
        // runtimeType: RuntimeTokens, // TO DO
      }),
    }),
    refresh: builder.query<Tokens, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
        runtimeType: RuntimeTokens,
      }),
    }),
    signout: builder.query<void, void>({
      query: () => ({
        url: '/auth/signout',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCurrentUserQuery, useSigninMutation, useSignoutQuery } = userApi;
