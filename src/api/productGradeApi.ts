import { commonApi } from './commonApi';
import { ProductGrade } from '../@types/entities/ProductGrade';
import { ProductGradeGetListDto } from '../@types/dto/productGrade/product-grade.get-list.dto';
import { Path } from '../constants/routes';

export const productGradeApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getProductGradeList: builder.query<ProductGrade[], ProductGradeGetListDto>({
        query(params) {
          return {
            method: 'GET',
            url: `${Path.PRODUCTS}/${Path.GRADES}`,
            params,
          };
        },
        providesTags: result =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'ProductGrade', id } as const)),
                { type: 'ProductGrade', id: 'LIST' },
              ]
            : [{ type: 'ProductGrade', id: 'LIST' }],
      }),
      updateProductGrade: builder.mutation<
        ProductGrade,
        Pick<ProductGrade, 'isApproved' | 'id'>
      >({
        query(grade: Pick<ProductGrade, 'isApproved' | 'id'>) {
          return {
            method: 'PUT',
            url: `${Path.PRODUCTS}/${Path.GRADES}/${grade.id}`,
            body: grade,
          };
        },
        invalidatesTags: [{ type: 'ProductGrade', id: 'LIST' }],
      }),
    };
  },
});

export const { useGetProductGradeListQuery, useUpdateProductGradeMutation } =
  productGradeApi;
