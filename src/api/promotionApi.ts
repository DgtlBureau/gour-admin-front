import { commonApi } from './commonApi';
import { Path } from '../constants/routes';
import { PromotionCreateDto } from '../@types/dto/promotion/create.dto';
import { PromotionUpdateDto } from '../@types/dto/promotion/update.dto';
import { Promotion } from '../@types/entities/Promotion';

export const promotionApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getByIdPromotion: builder.query<Promotion, number>({
      query: id => ({
        url: `${Path.STOCKS}/${id}`,
        method: 'GET',
      }),
    }),
    getAllPromotions: builder.query<Promotion[], void>({
      query: () => ({
        url: Path.STOCKS,
        method: 'GET',
      }),
    }),
    createPromotion: builder.mutation<void, PromotionCreateDto>({
      query: body => ({
        url: Path.STOCKS,
        method: 'POST',
        body,
      }),
    }),
    updatePromotion: builder.mutation<void, PromotionUpdateDto>({
      query: ({ id, ...body }) => ({
        url: `${Path.STOCKS}/${id}`,
        method: 'POST',
        body,
      }),
    }),
    deletePromotion: builder.mutation<void, number>({
      query: id => ({
        url: `${Path.STOCKS}/${id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useDeletePromotionMutation,
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
  useGetAllPromotionsQuery,
  useGetByIdPromotionQuery,
} = promotionApi;
