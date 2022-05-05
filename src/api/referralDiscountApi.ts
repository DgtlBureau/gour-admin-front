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
      }),
      updateReferralDiscount: builder.mutation<void, ReferralDiscountEditDto>({
        query(discount) {
          return {
            method: 'post',
            url: 'referralCodes/discount',
            body: discount,
          };
        },
      }),
    };
  },
});

export const { useGetReferralDiscountQuery, useUpdateReferralDiscountMutation } =
  referralDiscountApi;
