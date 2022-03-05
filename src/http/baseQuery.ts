import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { checkRuntimeType, RuntimeType } from '../@types/utils/checkRuntime';
import { HTTP_EXPECTATION_FAILED, HTTP_UNAUTHORIZED } from '../constants/HttpConstants';

class RuntimeTypeError extends Error {}

interface CustomArgs extends FetchArgs {
  runtimeType?: RuntimeType;
}

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'application/json');
    return headers;
  },
});

export const baseQueryWithReauthAndCheckRuntimeTypes: BaseQueryFn<
  CustomArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === HTTP_UNAUTHORIZED) {
    const refreshResult = await baseQuery(
      { url: 'auth/refresh', method: 'POST' },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery({ url: 'auth/signout', method: 'POST' }, api, extraOptions);
      return result;
    }
  }

  try {
    if (
      args.runtimeType &&
      result.data &&
      !checkRuntimeType(result.data, args.runtimeType)
    ) {
      throw new RuntimeTypeError('runtime type error');
    }
  } catch (error) {
    if (error instanceof RuntimeTypeError) {
      return {
        error: { status: HTTP_EXPECTATION_FAILED, data: { message: error.message } },
      };
    }
  }

  return result;
};
