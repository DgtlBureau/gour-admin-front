import { combineReducers } from '@reduxjs/toolkit';
import { productsApi } from '../api/productsApi';
import { userApi } from '../api/userApi';
import authSlice from './slices/authSlice';

export const rootReducer = combineReducers({
  auth: authSlice,
  [userApi.reducerPath]: userApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
});
