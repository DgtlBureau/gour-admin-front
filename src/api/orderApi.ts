import { Path } from 'constants/routes';

import { Order } from 'types/entities/Order';

import { commonApi } from './commonApi';

export const orderApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getOrdersList: builder.query<
        { orders: Order[]; totalCount: number },
        { clientId: string; length: number; offset: number }
      >({
        query: ({ clientId, ...params }) => ({
          method: 'GET',
          url: `${Path.ORDERS}/${Path.USERS}/${clientId}`,
          params,
        }),
      }),
    };
  },
});

export const { useGetOrdersListQuery } = orderApi;
