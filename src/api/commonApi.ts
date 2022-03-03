import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauthAndCheckRuntimeTypes } from '../http/baseQuery';

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: baseQueryWithReauthAndCheckRuntimeTypes,
  tagTypes: ['Common'],
  endpoints: () => ({}),
});
