import { PromoCodeCreateDto } from 'types/dto/promoCode/create.dto';
import { PromoCode } from 'types/entities/PromoCode';

import { Path } from '../constants/routes';
import { commonApi } from './commonApi';

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
        providesTags: result =>
          result
            ? [...result.map(({ id }) => ({ type: 'PromoCode', id } as const)), { type: 'PromoCode', id: 'LIST' }]
            : [{ type: 'PromoCode', id: 'LIST' }],
      }),
      getPromoCode: builder.query<PromoCode, number>({
        query(id) {
          return {
            method: 'GET',
            url: `${Path.PROMO_CODES}/${id}`,
          };
        },
        providesTags: (r, e, id) => [{ type: 'PromoCode', id }],
      }),
      createPromoCode: builder.mutation<PromoCode, PromoCodeCreateDto>({
        query(body) {
          return {
            method: 'POST',
            url: Path.PROMO_CODES,
            body,
          };
        },
        invalidatesTags: [{ type: 'PromoCode', id: 'LIST' }],
      }),
      updatePromoCode: builder.mutation<PromoCode, Partial<PromoCode>>({
        query({ id, ...body }) {
          return {
            method: 'PUT',
            url: `${Path.PROMO_CODES}/${id}`,
            body,
          };
        },
        invalidatesTags: [{ type: 'PromoCode', id: 'LIST' }],
      }),
      deletePromoCode: builder.mutation<PromoCode, number>({
        query(id) {
          return {
            method: 'DELETE',
            url: `${Path.PROMO_CODES}/${id}`,
          };
        },
        invalidatesTags: [{ type: 'PromoCode', id: 'LIST' }],
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
} = promoCodeApi;
