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
        url: `${Path.GOODS}/${id}`,
        method: 'GET',
        params,
      }),
    }),
    getAllProducts: builder.query<Product[], ProductGetListDto>({
      query: params => ({
        url: `${Path.GOODS}`,
        method: 'GET',
        params,
      }),
      providesTags: result => (
        result ? (
          [
            ...result.map(({ id }) => ({ type: 'Product' as const, id })),
            { type: 'Product', id: 'LIST' },
          ]
        ) : (
          [{ type: 'Product', id: 'LIST' }]
        )
      ),
    }),
    createProduct: builder.mutation<void, ProductCreateDto>({
      query: body => ({
        url: Path.GOODS,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    createGrade: builder.mutation<void, ProductGradeCreateDto>({
      query: body => ({
        url: `${Path.GOODS}/grade`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    updateProduct: builder.mutation<void, ProductUpdateDto>({
      query: ({ id, ...body }) => ({
        url: `${Path.GOODS}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: id => ({
        url: `${Path.GOODS}/${id}`,
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
