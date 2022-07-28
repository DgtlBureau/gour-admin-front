import { commonApi } from './commonApi';

export const referralDiscountApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getReferralDiscount: builder.query<number, void>({
        query() {
          return {
            method: 'get',
            url: 'referralCodes/discount',
          };
        },
        providesTags: [{ type: 'ReferralDiscount', id: 0 }],
      }),
      updateReferralDiscount: builder.mutation<void, { discount: number }>({
        query(discount) {
          return {
            method: 'post',
            url: 'referralCodes/discount',
            body: discount,
          };
        },
        invalidatesTags: [{ type: 'ReferralDiscount', id: 0 }],
      }),
    };
  },
});

export const { useGetReferralDiscountQuery, useUpdateReferralDiscountMutation } =
  referralDiscountApi;
