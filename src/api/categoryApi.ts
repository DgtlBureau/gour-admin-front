import { commonApi } from './commonApi';
import { Path } from '../constants/routes';
import { CategoryCreateDto } from '../@types/dto/category/create.dto';
import { CategoryUpdateDto } from '../@types/dto/category/update.dto';
import { Category } from '../@types/entities/Category';

export const categoryApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getCategoryById: builder.query<Category, number>({
      query: id => ({
        url: `${Path.CATEGORIES}/${id}`,
        method: 'GET',
      }),
    }),
    getAllCategories: builder.query<Category[], void>({
      query: () => ({
        url: Path.CATEGORIES,
        method: 'GET',
      }),
    }),
    createCategory: builder.mutation<void, CategoryCreateDto>({
      query: body => ({
        url: Path.CATEGORIES,
        method: 'POST',
        body,
      }),
    }),
    updateCategory: builder.mutation<void, CategoryUpdateDto>({
      query: ({ id, ...body }) => ({
        url: `${Path.CATEGORIES}/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteCategory: builder.mutation<void, number>({
      query: id => ({
        url: `${Path.CATEGORIES}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
} = categoryApi;
