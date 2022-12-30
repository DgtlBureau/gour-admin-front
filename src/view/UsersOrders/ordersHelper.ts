import { ru as ruLocale } from 'date-fns/locale';

import type { FullOrder } from 'components/Users/Orders/Card';
import type { OrderProductType } from 'components/Users/Orders/CardProduct';

import { Order } from 'types/entities/Order';

import { formatDate } from 'utils/dateUtil';
import { getFullName } from 'utils/namingUtil';

export function formatOrderData(order: Order, lang: 'ru' | 'en', currency: 'cheeseCoin'): FullOrder {
  const client = getFullName(order.firstName, order.lastName || '');

  const products: OrderProductType[] = order.orderProducts.map(product => ({
    photo: product.product?.images[0]?.small || '', // TODO: исправить тип
    title: product.product?.title[lang], // TODO: исправить тип
    amount: product.amount,
    gram: product.gram,
    totalSum: product.totalSum,
    totalSumWithoutAmount: product.totalSumWithoutAmount,
    cost: product.product?.price?.[currency] || 0,
  }));

  const promotions = order.promotions.map(promotion => ({
    title: promotion.title,
    amount: promotion.value,
  }));

  const { city, street, house, apartment } = order.orderProfile;

  const title = order.leadId.toString() || '####';
  const address = `${city.name[lang]}, ${street}, ${house}, кв. ${apartment},`;
  const status = order.crmInfo?.status;
  const createdAt = new Date(order.createdAt);

  return {
    id: order.id,
    title,
    status,
    createdAt,
    address,
    client,
    products,
    promotions,
    deliveryCost: 500, // TODO: данные должны идти с бека©,
    currency,
    totalSum: order.totalSum,
  };
}

export const groupOrdersByDate = (ordersList: FullOrder[]) =>
  [...ordersList]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .reduce<Record<string, FullOrder[]>>((acc, order) => {
      const orderKey = formatDate(order.createdAt, 'd MMMM yyyy', {
        locale: ruLocale,
      });

      acc[orderKey] ??= [];

      acc[orderKey].push(order);
      return acc;
    }, {});

export const getProductKeyInBasket = (productId: number, gram: number) => `${productId}:${gram}`;
