import { Path } from 'constants/routes';

import { Order } from 'types/entities/Order';

import { commonApi } from './commonApi';

export const orderApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getOrdersList: builder.query<Order[], string>({
        query: clientId => ({
          method: 'GET',
          url: `${Path.ORDERS}/${Path.USERS}/${clientId}`,
        }),
      }),
    };
  },
});

export const { useGetOrdersListQuery } = orderApi;
