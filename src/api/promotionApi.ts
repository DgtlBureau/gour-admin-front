import { commonApi } from './commonApi';
import { Path } from '../constants/routes';
import { PromotionCreateDto } from '../@types/dto/promotion/create.dto';
import { PromotionUpdateDto } from '../@types/dto/promotion/update.dto';
import { Promotion } from '../@types/entities/Promotion';

export const promotionApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getById: builder.query<Promotion, number>({
      query: id => ({
        url: `${Path.STOCKS}/${id}`,
        method: 'GET',
      }),
    }),
    getAll: builder.query<Promotion[], void>({
      query: () => ({
        url: Path.STOCKS,
        method: 'GET',
      }),
    }),
    create: builder.mutation<void, PromotionCreateDto>({
      query: body => ({
        url: Path.STOCKS,
        method: 'POST',
        body,
      }),
    }),
    update: builder.mutation<void, PromotionUpdateDto>({
      query: ({ id, ...body }) => ({
        url: `${Path.STOCKS}/${id}`,
        method: 'POST',
        body,
      }),
    }),
    delete: builder.mutation<void, number>({
      query: id => ({
        url: `${Path.STOCKS}/${id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useDeleteMutation,
  useCreateMutation,
  useUpdateMutation,
  useGetAllQuery,
  useGetByIdQuery,
} = promotionApi;
