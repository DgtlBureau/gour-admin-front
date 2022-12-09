import { CategoryCreateDto } from 'types/dto/category/create.dto';
import { CategoryUpdateDto } from 'types/dto/category/update.dto';
import { LowLevelCategory, TopLevelCategory } from 'types/entities/Category';

import { Path } from '../constants/routes';
import { commonApi } from './commonApi';

export const categoryApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getAllCategories: builder.query<TopLevelCategory[], void>({
      query: () => ({
        url: Path.CATEGORIES,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Category' as const, id })), { type: 'Category', id: 'LIST' }]
          : [{ type: 'Category', id: 'LIST' }],
    }),
    createCategory: builder.mutation<LowLevelCategory, CategoryCreateDto>({
      query: body => ({
        url: Path.CATEGORIES,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    updateCategory: builder.mutation<void, CategoryUpdateDto>({
      query: ({ id, ...body }) => ({
        url: `${Path.CATEGORIES}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: id => ({
        url: `${Path.CATEGORIES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
  }),
});

export const {
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllCategoriesQuery,
} = categoryApi;
