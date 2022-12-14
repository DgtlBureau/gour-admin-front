import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { baseQueryWithReauth } from '../http/baseQuery';

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Common',
    'City',
    'Product',
    'ProductGrade',
    'Promotion',
    'Client',
    'Category',
    'Page',
    'PromoCode',
    'ReferralCode',
    'ReferralDiscount',
    'User',
  ],
  endpoints: () => ({}),
});
