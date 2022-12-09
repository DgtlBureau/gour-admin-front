import { combineReducers } from '@reduxjs/toolkit';

import { commonApi } from 'api/commonApi';

import authSlice from './slices/authSlice';

export const rootReducer = combineReducers({
  auth: authSlice,
  [commonApi.reducerPath]: commonApi.reducer,
});
