import { combineReducers } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi';
import userSlice from './slices/userSlice';

export const rootReducer = combineReducers({
  user: userSlice,
  [userApi.reducerPath]: userApi.reducer,
});
