import {commonApi} from "./commonApi";
import {City} from "../@types/entities/City";

export const cityApi = commonApi.injectEndpoints({
    endpoints(builder) {
        return {
            getCityList: builder.query<City[], void>({
                query() {
                    return {
                        method: 'get',
                        url: 'cities',
                    }
                },
                providesTags: (result) =>
                    result ? [
                        ...result.map(({id}) => ({type: 'City', id} as const)),
                        {type: 'City', id: 'LIST'},
                    ] : [{type: 'City', id: 'LIST'}],
            }),
            getCity: builder.query<City, number>({
                query(id) {
                    return {
                        method: 'get',
                        url: `cities/${id}`,
                    }
                },
                providesTags: (result, error, id) => [{ type: 'City', id }],
            }),
            createCity: builder.mutation<City, Partial<City>>({
                query(city) {
                    return {
                        method: 'post',
                        url: `cities`,
                        body: city
                    }
                },
                invalidatesTags: [
                    { type: 'City', id: 'LIST' },
                ],
            }),
            updateCity: builder.mutation<City, Partial<City> & Pick<City, 'id'>>({
                query(city) {
                    return {
                        method: 'put',
                        url: `cities/${city.id}`,
                        body: city
                    }
                },
                invalidatesTags: (r,e,{id}) => [
                    { type: 'City', id },
                ],
            }),
            deleteCity: builder.mutation<City, number>({
                query(id) {
                    return {
                        method: 'delete',
                        url: `cities/${id}`,
                    }
                },
                invalidatesTags: [
                    { type: 'City', id: 'LIST' },
                ],
            })
        }
    }
})


export const {
    useCreateCityMutation,
    useDeleteCityMutation,
    useGetCityQuery,
    useGetCityListQuery,
    useLazyGetCityQuery,
    useUpdateCityMutation
} = cityApi