import { Path } from '../constants/routes';
import { commonApi } from './commonApi';

export const referralDiscountApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getReferralDiscount: builder.query<number, void>({
        query() {
          return {
            method: 'GET',
            url: `${Path.REFERRAL_CODES}/${Path.DISCOUNT}`,
          };
        },
        providesTags: [{ type: 'ReferralDiscount', id: 0 }],
      }),
      updateReferralDiscount: builder.mutation<void, { discount: number }>({
        query(discount) {
          return {
            method: 'POST',
            url: `${Path.REFERRAL_CODES}/${Path.DISCOUNT}`,
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
