import { commonApi } from './commonApi';
import { ReferralCode } from '../@types/entities/ReferralCode';
import { Path } from '../constants/routes';

export const referralCodeApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getReferralCodesList: builder.query<ReferralCode[], void>({
        query() {
          return {
            method: 'GET',
            url: Path.REFERRAL_CODES,
          };
        },
        providesTags: result =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'ReferralCode', id } as const)),
                { type: 'ReferralCode', id: 'LIST' },
              ]
            : [{ type: 'ReferralCode', id: 'LIST' }],
      }),
      getReferralCode: builder.query<ReferralCode, number>({
        query(id) {
          return {
            method: 'GET',
            url: `${Path.REFERRAL_CODES}/${id}`,
          };
        },
        providesTags: (r, e, id) => [{ type: 'ReferralCode', id }],
      }),
      createReferralCode: builder.mutation<ReferralCode, Partial<ReferralCode>>({
        query(referralCode) {
          return {
            method: 'POST',
            url: Path.REFERRAL_CODES,
            body: referralCode,
          };
        },
        invalidatesTags: [{ type: 'ReferralCode', id: 'LIST' }],
      }),
      deleteReferralCode: builder.mutation<ReferralCode, number>({
        query(id) {
          return {
            method: 'DELETE',
            url: `${Path.REFERRAL_CODES}/${id}`,
          };
        },
        invalidatesTags: [{ type: 'ReferralCode', id: 'LIST' }],
      }),
    };
  },
});

export const {
  useCreateReferralCodeMutation,
  useDeleteReferralCodeMutation,
  useGetReferralCodeQuery,
  useGetReferralCodesListQuery,
  useLazyGetReferralCodeQuery,
} = referralCodeApi;
