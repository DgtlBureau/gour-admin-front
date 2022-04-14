import { commonApi } from './commonApi';
import { ProductGrade } from '../@types/entities/ProductGrade';
import { ProductGradeGetListDto } from '../@types/dto/productGrade/product-grade.get-list.dto';

export const productGradeApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getProductGradeList: builder.query<ProductGrade[], ProductGradeGetListDto>({
        query(params) {
          return {
            method: 'get',
            url: 'productGrades',
            params,
          };
        },
        providesTags: result => (result ?
          [
            ...result.map(({ id }) => ({ type: 'ProductGrade', id } as const)),
            { type: 'ProductGrade', id: 'LIST' },
          ] :
          [{ type: 'ProductGrade', id: 'LIST' }]),
      }),
      updateProductGrade: builder.mutation<
        ProductGrade,
        Pick<ProductGrade, 'isApproved' | 'id'>
      >({
        query(grade: Pick<ProductGrade, 'isApproved' | 'id'>) {
          return {
            method: 'post',
            url: `productGrades/${grade.id}/approve`,
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
