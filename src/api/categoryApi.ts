import { commonApi } from './commonApi';
import { Path } from '../constants/routes';
import { CategoryCreateDto } from '../@types/dto/category/create.dto';
import { CategoryUpdateDto } from '../@types/dto/category/update.dto';
import { Category } from '../@types/entities/Category';

export const categoryApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getById: builder.query<Category, number>({
      query: id => ({
        url: `${Path.CATEGORY}/${id}`,
        method: 'GET',
      }),
    }),
    getAllCategories: builder.query<Category[], void>({
      query: () => ({
        url: Path.CATEGORIES,
        method: 'GET',
      }),
    }),
    create: builder.mutation<void, CategoryCreateDto>({
      query: body => ({
        url: Path.CATEGORY,
        method: 'POST',
        body,
      }),
    }),
    update: builder.mutation<void, CategoryUpdateDto>({
      query: ({ id, ...body }) => ({
        url: `${Path.CATEGORY}/${id}`,
        method: 'POST',
        body,
      }),
    }),
    delete: builder.mutation<void, number>({
      query: id => ({
        url: `${Path.CATEGORY}/${id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useDeleteMutation,
  useCreateMutation,
  useUpdateMutation,
  useGetAllCategoriesQuery,
  useGetByIdQuery,
} = categoryApi;
