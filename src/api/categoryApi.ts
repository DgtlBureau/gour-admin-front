import { commonApi } from './commonApi';
import { Path } from '../constants/routes';
import { CategoryCreateDto } from '../@types/dto/category/create.dto';
import { CategoryUpdateDto } from '../@types/dto/category/update.dto';
import { Category, TopLevelCategory } from '../@types/entities/Category';

export const categoryApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getAllCategories: builder.query<TopLevelCategory[], void>({
      query: () => ({
        url: Path.CATEGORIES,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Category' as const, id })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }],
    }),
    createCategory: builder.mutation<Category, CategoryCreateDto>({
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
      // FIXME: чекнуть реализацию
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
