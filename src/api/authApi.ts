import { ForgotPasswordDto } from 'types/dto/auth/forgot-password.dto';
import { RestorePasswordDto } from 'types/dto/auth/restore-password.dto';
import { SignInDto } from 'types/dto/auth/signin.dto';
import { SignupWithoutPasswordDto } from 'types/dto/auth/signup-without-password.dto';
import { Tokens } from 'types/dto/auth/tokens.dto';
import { User } from 'types/entities/User';

import { Path } from '../constants/routes';
import { commonApi } from './commonApi';

const ROLE_HASH: Record<'admin' | 'moderator', string> = {
  admin: process.env.REACT_APP_ROLE_ADMIN_CODE as string,
  moderator: process.env.REACT_APP_ROLE_MODERATOR_CODE as string,
};

export const authApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: `${Path.AUTH}/${Path.CURRENT_USER}`,
        method: 'GET',
      }),
    }),
    refresh: builder.query<Tokens, void>({
      query: () => ({
        url: `${Path.AUTH}/${Path.REFRESH}`,
        method: 'POST',
      }),
    }),
    signout: builder.mutation<void, void>({
      query: () => ({
        url: `${Path.AUTH}/${Path.SIGNOUT}`,
        method: 'POST',
      }),
    }),
    signin: builder.mutation<Tokens, SignInDto>({
      query: body => ({
        url: `${Path.AUTH}/${Path.SIGNIN}`,
        method: 'POST',
        body,
      }),
    }),
    signupWithoutPassword: builder.mutation<Tokens, SignupWithoutPasswordDto>({
      query: ({ name, lastName, email, role: roleKey }) => ({
        url: `${Path.AUTH}/${Path.SIGNUP_WITHOUT_PASSWORD}`,
        method: 'POST',
        body: {
          name,
          lastName,
          email,
          role: ROLE_HASH[roleKey],
        },
      }),
    }),
    forgotPassword: builder.mutation<void, ForgotPasswordDto>({
      query: body => ({
        url: `${Path.AUTH}/${Path.FORGOT_PASSWORD}`,
        method: 'POST',
        body,
      }),
    }),
    restorePassword: builder.mutation<void, RestorePasswordDto>({
      query: body => ({
        url: `${Path.AUTH}/${Path.RESTORE_PASSWORD}`,
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
