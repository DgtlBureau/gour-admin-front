import { commonApi } from './commonApi';
import { City } from '../@types/entities/City';
import { Path } from '../constants/routes';

export const cityApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getCityList: builder.query<City[], void>({
        query() {
          return {
            method: 'GET',
            url: Path.CITIES,
          };
        },
        providesTags: result =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'City', id } as const)),
                { type: 'City', id: 'LIST' },
              ]
            : [{ type: 'City', id: 'LIST' }],
      }),
      getCity: builder.query<City, number>({
        query(id) {
          return {
            method: 'GET',
            url: `${Path.CITIES}/${id}`,
          };
        },
        providesTags: (r, e, id) => [{ type: 'City', id }],
      }),
      createCity: builder.mutation<City, Partial<City>>({
        query(city) {
          return {
            method: 'POST',
            url: Path.CITIES,
            body: city,
          };
        },
        invalidatesTags: [{ type: 'City', id: 'LIST' }],
      }),
      updateCity: builder.mutation<City, Partial<City> & Pick<City, 'id'>>({
        query(city) {
          return {
            method: 'PUT',
            url: `${Path.CITIES}/${city.id}`,
            body: city,
          };
        },
        invalidatesTags: (r, e, { id }) => [{ type: 'City', id }],
      }),
      deleteCity: builder.mutation<City, number>({
        query(id) {
          return {
            method: 'DELETE',
            url: `${Path.CITIES}/${id}`,
          };
        },
        invalidatesTags: [{ type: 'City', id: 'LIST' }],
      }),
    };
  },
});

export const {
  useCreateCityMutation,
  useDeleteCityMutation,
  useGetCityQuery,
  useGetCityListQuery,
  useLazyGetCityQuery,
  useUpdateCityMutation,
} = cityApi;
