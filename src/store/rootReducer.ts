import { combineReducers } from '@reduxjs/toolkit';
import { categoryApi } from '../api/categoryApi';
import { productApi } from '../api/productApi';
import { promotionApi } from '../api/promotionApi';
import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';
import authSlice from './slices/authSlice';
import { cityApi } from '../api/cityApi';
import { productGradeApi } from '../api/productGradeApi';
import { pageApi } from '../api/pageApi';
import { clientRoleApi } from '../api/clientRoleApi';
import { referralCodeApi } from '../api/referralCodeApi';
import { referralDiscountApi } from '../api/referralDiscountApi';

export const rootReducer = combineReducers({
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [promotionApi.reducerPath]: promotionApi.reducer,
  [cityApi.reducerPath]: cityApi.reducer,
  [productGradeApi.reducerPath]: productGradeApi.reducer,
  [pageApi.reducerPath]: pageApi.reducer,
  [clientRoleApi.reducerPath]: clientRoleApi.reducer,
  [referralCodeApi.reducerPath]: referralCodeApi.reducer,
  [referralDiscountApi.reducerPath]: referralDiscountApi.reducer,
});
