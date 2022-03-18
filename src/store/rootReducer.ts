import { combineReducers } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi';
import authSlice from './slices/authSlice';

export const rootReducer = combineReducers({
  auth: authSlice,
  [userApi.reducerPath]: userApi.reducer,
});
