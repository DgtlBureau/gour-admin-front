import { commonApi } from './commonApi';
import { ReferralCode } from '../@types/entities/ReferralCode';
import { ReferralDiscountEditDto } from '../@types/dto/referral/discount-edit.dto';

export const referralDiscountApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getReferralDiscount: builder.query<ReferralDiscountEditDto, void>({
        query() {
          return {
            method: 'get',
            url: 'referralCodes/discount',
          };
        },
        providesTags: [{ type: 'ReferralDiscount', id: 0 }],
      }),
      updateReferralDiscount: builder.mutation<void, ReferralDiscountEditDto>({
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
