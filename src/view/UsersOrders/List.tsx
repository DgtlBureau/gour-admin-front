import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetOrdersListQuery } from 'api/orderApi';

import { Header } from 'components/Header/Header';
import { Box } from 'components/UI/Box/Box';
import { InfiniteScroll } from 'components/UI/InfiniteScroll/InfiniteScroll';
import { Typography } from 'components/UI/Typography/Typography';
import { OrdersCard } from 'components/Users/Orders/Card';

import { Order } from 'types/entities/Order';

import { formatOrderData, groupOrdersByDate } from './ordersHelper';

function ListUsersOrdersView() {
  const { id: userId } = useParams();

  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);

  const length = 15;

  const offset = (page - 1) * length;

  const {
    data: ordersData,
    isFetching,
    isError,
    isSuccess,
  } = useGetOrdersListQuery({ clientId: userId!, length, offset });

  const totalCount = ordersData?.totalCount || 0;

  const hasMore = orders.length < totalCount;

  const orderEntries = useMemo(() => {
    const formattedOrdersList = orders.map(order => formatOrderData(order, 'ru', 'cheeseCoin'));
    const groupedOrders = groupOrdersByDate(formattedOrdersList);

    return Object.entries(groupedOrders);
  }, [orders]);

  const turnPage = useCallback(() => {
    setPage(currPage => currPage + 1);
  }, []);

  useEffect(() => {
    const newOrders = ordersData?.orders || [];

    setOrders(prevOrders => [...prevOrders, ...newOrders]);
  }, [ordersData]);

  const isEmptyOrders = isSuccess && !orderEntries.length;

  return (
    <div>
      <Header leftTitle='Заказы пользователя' />

      {isError && <Typography variant='h5'>Произошла ошибка</Typography>}

      <InfiniteScroll hasMore={hasMore} isLoading={isFetching} onUpload={turnPage}>
        {orderEntries.map(([groupDate, ordersList]) => (
          <Box sx={{ marginBottom: '10px' }}>
            <Typography variant='h6'>{groupDate}</Typography>

            {ordersList.map(order => (
              <OrdersCard order={order} key={order.id} />
            ))}
          </Box>
        ))}
      </InfiniteScroll>

      {isEmptyOrders && <Typography variant='h5'>Список заказов пуст</Typography>}
    </div>
  );
}

export default ListUsersOrdersView;
