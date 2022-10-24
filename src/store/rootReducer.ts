import { combineReducers } from '@reduxjs/toolkit';

import { authApi } from '../api/authApi';
import { categoryApi } from '../api/categoryApi';
import { cityApi } from '../api/cityApi';
import { clientRoleApi } from '../api/clientRoleApi';
import { pageApi } from '../api/pageApi';
import { productApi } from '../api/productApi';
import { productGradeApi } from '../api/productGradeApi';
import { promotionApi } from '../api/promotionApi';
import { referralCodeApi } from '../api/referralCodeApi';
import { referralDiscountApi } from '../api/referralDiscountApi';
import { userApi } from '../api/userApi';
import authSlice from './slices/authSlice';

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
