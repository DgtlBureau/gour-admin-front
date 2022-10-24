import { FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query';

import { ProductGradeCreateDto } from 'types/dto/product/create-grade.dto';
import { ProductCreateDto } from 'types/dto/product/create.dto';
import { ProductGetListDto } from 'types/dto/product/get-list.dto';
import { ProductGetOneDto } from 'types/dto/product/get-one.dto';
import { ProductUpdateDto } from 'types/dto/product/update.dto';
import { CategoryWithParents, LowLevelCategory, MidLevelCategory, TopLevelCategory } from 'types/entities/Category';
import { Product } from 'types/entities/Product';

import { Path } from '../constants/routes';
import { commonApi } from './commonApi';

// FIXME: вынести в глобальный тип
type ProductDto = Omit<Product, 'categories'> & { categories: CategoryWithParents[] };

// FIXME: в хелперы
const takeCategoryFromSubCategory = (categoryDto: CategoryWithParents): MidLevelCategory => {
  const { parentCategories, ...subCategory } = categoryDto;
  const midLevelCategory = (parentCategories as MidLevelCategory[])[0];
  return {
    ...midLevelCategory,
    subCategories: [subCategory as LowLevelCategory],
  };
};

const transformProductCategories = (product: ProductDto) => {
  // с бэка прилетают категории в формате массива подкатегорий с parentCategories
  // исправляю это, создав дерево категорий

  let topCategory = {} as TopLevelCategory;
  const midCategories: MidLevelCategory[] = [];

  product.categories.forEach(category => {
    if (category.parentCategories.length === 0) {
      topCategory = category as TopLevelCategory;
    } else {
      midCategories.push(takeCategoryFromSubCategory(category));
    }
  });

  return {
    ...product,
    categories: [{ ...topCategory, subCategories: midCategories }],
  };
};

export const productApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getProductById: builder.query<Product, ProductGetOneDto>({
      query: ({ id, ...params }) => ({
        url: `${Path.PRODUCTS}/${id}`,
        method: 'GET',
        params,
      }),
      providesTags: (r, e, { id }) => [{ type: 'Product', id }],
      transformResponse: transformProductCategories,
    }),
    getAllProducts: builder.query<{ products: Product[]; totalCount: number }, ProductGetListDto>({
      query: params => ({
        url: Path.PRODUCTS,
        method: 'GET',
        params,
      }),
      transformResponse(products: Product[], { response }: FetchBaseQueryMeta) {
        const totalCount = response?.headers.get('X-Total-Count') || 0;
        return {
          products,
          totalCount: +totalCount,
        };
      },
      providesTags: result =>
        result
          ? [...result.products.map(({ id }) => ({ type: 'Product', id } as const)), { type: 'Product', id: 'LIST' }]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    createProduct: builder.mutation<void, ProductCreateDto>({
      query: body => ({
        url: Path.PRODUCTS,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    createGrade: builder.mutation<void, ProductGradeCreateDto>({
      query: body => ({
        url: `${Path.PRODUCTS}/${body.product}/${Path.GRADES}`,
        method: 'POST',
        body,
      }),
    }),
    updateProduct: builder.mutation<void, ProductUpdateDto>({
      query: ({ id, ...body }) => ({
        url: `${Path.PRODUCTS}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (r, e, { id }) => [{ type: 'Product', id }],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: id => ({
        url: `${Path.PRODUCTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateGradeMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
  useGetProductByIdQuery,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} = productApi;
