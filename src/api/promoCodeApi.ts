import { ExportDto } from 'types/dto/export.dto';
import { PromoCodeCreateDto } from 'types/dto/promoCode/create.dto';
import { PromoCode } from 'types/entities/PromoCode';

import { Path } from '../constants/routes';
import { commonApi, getFileUrlFromRes, providesList } from './commonApi';

export const promoCodeApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getPromoCodesList: builder.query<PromoCode[], void>({
        query() {
          return {
            method: 'GET',
            url: Path.PROMO_CODES,
          };
        },
        providesTags: result => providesList(result, 'PromoCode'),
      }),
      getPromoCode: builder.query<PromoCode, number>({
        query(id) {
          return {
            method: 'GET',
            url: `${Path.PROMO_CODES}/${id}`,
          };
        },
        providesTags: (_r, _e, id) => [{ type: 'PromoCode', id }],
      }),
      createPromoCode: builder.mutation<PromoCode, PromoCodeCreateDto>({
        query(body) {
          return {
            method: 'POST',
            url: Path.PROMO_CODES,
            body,
          };
        },
        invalidatesTags: (r, _e, _arg) => [{ type: 'PromoCode', id: r?.id }],
      }),
      updatePromoCode: builder.mutation<PromoCode, Partial<PromoCode>>({
        query({ id, ...body }) {
          return {
            method: 'PUT',
            url: `${Path.PROMO_CODES}/${id}`,
            body,
          };
        },
        invalidatesTags: (r, _e, _arg) => [{ type: 'PromoCode', id: r?.id }],
      }),
      deletePromoCode: builder.mutation<PromoCode, number>({
        query(id) {
          return {
            method: 'DELETE',
            url: `${Path.PROMO_CODES}/${id}`,
          };
        },
        invalidatesTags: (r, _e, _arg) => [{ type: 'PromoCode', id: r?.id }],
      }),
      exportPromoCodes: builder.mutation<string, ExportDto | undefined>({
        query(body) {
          return {
            method: 'POST',
            url: `${Path.PROMO_CODES}/${Path.EXPORT}`,
            body,
            responseHandler: getFileUrlFromRes,
          };
        },
      }),
    };
  },
});

export const {
  useCreatePromoCodeMutation,
  useUpdatePromoCodeMutation,
  useDeletePromoCodeMutation,
  useGetPromoCodeQuery,
  useGetPromoCodesListQuery,
  useLazyGetPromoCodeQuery,
  useExportPromoCodesMutation,
} = promoCodeApi;
