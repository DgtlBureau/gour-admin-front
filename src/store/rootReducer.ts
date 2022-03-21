import { combineReducers } from '@reduxjs/toolkit';
import { categoryApi } from '../api/categoryApi';
import { productApi } from '../api/productApi';
import { promotionApi } from '../api/promotionApi';
import { authApi } from '../api/authApi';
import authSlice from './slices/authSlice';
import { clientApi } from '../api/clientApi';

export const rootReducer = combineReducers({
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
  [clientApi.reducerPath]: clientApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [promotionApi.reducerPath]: promotionApi.reducer,
});
