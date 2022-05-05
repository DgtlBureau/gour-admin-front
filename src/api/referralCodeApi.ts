import { commonApi } from './commonApi';
import { ReferralCode } from '../@types/entities/ReferralCode';

export const referralCodeApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getReferralCodesList: builder.query<ReferralCode[], void>({
        query() {
          return {
            method: 'get',
            url: 'referralCodes',
          };
        },
        providesTags: result => (result ?
          [
            ...result.map(({ id }) => ({ type: 'ReferralCode', id } as const)),
            { type: 'ReferralCode', id: 'LIST' },
          ] :
          [{ type: 'ReferralCode', id: 'LIST' }]),
      }),
      getReferralCode: builder.query<ReferralCode, number>({
        query(id) {
          return {
            method: 'get',
            url: `referralCodes/${id}`,
          };
        },
        providesTags: (result, error, id) => [{ type: 'ReferralCode', id }],
      }),
      createReferralCode: builder.mutation<ReferralCode, Partial<ReferralCode>>({
        query(referralCode) {
          return {
            method: 'post',
            url: 'referralCodes',
            body: referralCode,
          };
        },
        invalidatesTags: [{ type: 'ReferralCode', id: 'LIST' }],
      }),
      deleteReferralCode: builder.mutation<ReferralCode, number>({
        query(id) {
          return {
            method: 'delete',
            url: `referralCodes/${id}`,
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
