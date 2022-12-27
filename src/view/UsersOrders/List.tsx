import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetOrdersListQuery } from 'api/orderApi';

import { Header } from 'components/Header/Header';
import { Box } from 'components/UI/Box/Box';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { Typography } from 'components/UI/Typography/Typography';
import { OrdersCard } from 'components/Users/Orders/Card';

import { formatOrderData, groupOrdersByDate } from './ordersHelper';

function ListUsersOrdersView() {
  const { id: userId } = useParams();

  const { data: unformattedOrderList, isFetching, isError, isSuccess } = useGetOrdersListQuery(userId!);

  const orderEntries = useMemo(() => {
    if (!unformattedOrderList) return [];
    const formattedOrdersList = unformattedOrderList.map(order => formatOrderData(order, 'ru', 'cheeseCoin'));
    const groupedOrders = groupOrdersByDate(formattedOrdersList);
    return Object.entries(groupedOrders);
  }, [unformattedOrderList]);

  return (
    <div>
      <Header leftTitle='Заказы пользователя' />

      {isFetching && <ProgressLinear variant='indeterminate' />}
      {isError && <Typography variant='h5'>Произошла ошибка</Typography>}

      {isSuccess &&
        orderEntries.map(([groupDate, ordersList]) => (
          <Box>
            <Typography variant='h6'>{groupDate}</Typography>

            {ordersList.map(order => (
              <OrdersCard order={order} key={order.id} />
            ))}
          </Box>
        ))}

      {isSuccess && !orderEntries.length && <Typography variant='h5'>Список заказов пуст</Typography>}
    </div>
  );
}

export default ListUsersOrdersView;
