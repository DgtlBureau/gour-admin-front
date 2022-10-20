import { PageCreateDto } from 'types/dto/page/create.dto';
import { PageUpdateDto } from 'types/dto/page/update.dto';
import { Page } from 'types/entities/Page';

import { Path } from '../constants/routes';
import { commonApi } from './commonApi';

export const pageApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getAllPages: builder.query<Page[], void>({
        query() {
          return {
            url: Path.PAGES,
          };
        },
        providesTags: result =>
          result
            ? [...result.map(({ id }) => ({ type: 'Page', id } as const)), { type: 'Page', id: 'LIST' }]
            : [{ type: 'Page', id: 'LIST' }],
      }),
      createPage: builder.mutation<void, PageCreateDto>({
        query(page) {
          return {
            method: 'POST',
            url: Path.PAGES,
            body: page,
          };
        },
        invalidatesTags: [{ type: 'Page', id: 'LIST' }],
      }),
      updatePage: builder.mutation<void, PageUpdateDto>({
        query(page) {
          return {
            method: 'PUT',
            url: `${Path.PAGES}/${page.id}`,
            body: page,
          };
        },
        invalidatesTags: [{ type: 'Page', id: 'LIST' }],
      }),
    };
  },
});

export const { useGetAllPagesQuery, useCreatePageMutation, useUpdatePageMutation } = pageApi;
