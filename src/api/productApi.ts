import { FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query';
import { commonApi } from './commonApi';
import { Path } from '../constants/routes';
import { Product } from '../@types/entities/Product';
import { ProductCreateDto } from '../@types/dto/product/create.dto';
import { ProductUpdateDto } from '../@types/dto/product/update.dto';
import { ProductGradeCreateDto } from '../@types/dto/product/create-grade.dto';
import { ProductGetOneDto } from '../@types/dto/product/get-one.dto';
import { ProductGetListDto } from '../@types/dto/product/get-list.dto';

export const productApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getProductById: builder.query<Product, ProductGetOneDto>({
      query: ({ id, ...params }) => ({
        url: `${Path.PRODUCTS}/${id}`,
        method: 'GET',
        params,
      }),
      providesTags: (r, e, { id }) => [{ type: 'Product', id }],
    }),
    getAllProducts: builder.query<
      { products: Product[]; totalCount: number },
      ProductGetListDto
    >({
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
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product', id } as const)),
              { type: 'Product', id: 'LIST' },
            ]
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
