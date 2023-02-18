import { ExportDto } from 'types/dto/export.dto';
import { ReferralCode } from 'types/entities/ReferralCode';

import { Path } from '../constants/routes';
import { commonApi, getFileUrlFromRes } from './commonApi';

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
            ? [...result.map(({ id }) => ({ type: 'ReferralCode', id } as const)), { type: 'ReferralCode', id: 'LIST' }]
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
        query(body) {
          return {
            method: 'POST',
            url: Path.REFERRAL_CODES,
            body,
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
      exportReferrals: builder.mutation<string, ExportDto | undefined>({
        query(body) {
          return {
            method: 'POST',
            url: `${Path.REFERRAL_CODES}/${Path.EXPORT}`,
            body,
            responseHandler: getFileUrlFromRes,
          };
        },
      }),
      exportOrderReferrals: builder.mutation<string, ExportDto | undefined>({
        query(body) {
          return {
            method: 'POST',
            url: `${Path.REFERRAL_CODES}/${Path.EXPORT_VOLUME}`,
            body,
            responseHandler: getFileUrlFromRes,
          };
        },
      }),
      updateReferralCode: builder.mutation<ReferralCode, Partial<ReferralCode> & Pick<ReferralCode, 'id'>>({
        query(referralCode) {
          return {
            method: 'PUT',
            url: `${Path.REFERRAL_CODES}/${referralCode.id}`,
            body: referralCode,
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
  useExportReferralsMutation,
  useGetReferralCodeQuery,
  useGetReferralCodesListQuery,
  useLazyGetReferralCodeQuery,
  useUpdateReferralCodeMutation,
  useExportOrderReferralsMutation,
} = referralCodeApi;
