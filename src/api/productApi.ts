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
    getById: builder.query<Product, ProductGetOneDto>({
      query: ({ id, ...params }) => ({
        url: `${Path.GOODS}/${id}`,
        method: 'GET',
        params,
      }),
    }),
    getAllProducts: builder.query<
      { products: Product[]; totalCount: number },
      ProductGetListDto
    >({
      query: params => ({
        url: `${Path.GOODS}`,
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
    }),
    create: builder.mutation<void, ProductCreateDto>({
      query: body => ({
        url: Path.GOODS,
        method: 'POST',
        body,
      }),
    }),
    createGrade: builder.mutation<void, ProductGradeCreateDto>({
      query: body => ({
        url: `${Path.GOODS}/grade`,
        method: 'POST',
        body,
      }),
    }),
    update: builder.mutation<void, ProductUpdateDto>({
      query: ({ id, ...body }) => ({
        url: `${Path.GOODS}/${id}`,
        method: 'POST',
        body,
      }),
    }),
    delete: builder.mutation<void, number>({
      query: id => ({
        url: `${Path.GOODS}/${id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useCreateGradeMutation,
  useDeleteMutation,
  useCreateMutation,
  useGetByIdQuery,
  useGetAllProductsQuery,
  useUpdateMutation,
} = productApi;
