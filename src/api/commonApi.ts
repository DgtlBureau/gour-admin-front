import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { baseQueryWithReauth } from '../http/baseQuery';

const tagTypes = [
  'Common',
  'City',
  'Product',
  'ProductGrade',
  'Promotion',
  'Client',
  'Category',
  'Page',
  'PromoCode',
  'ReferralCode',
  'ReferralDiscount',
  'User',
];

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: baseQueryWithReauth,
  tagTypes,
  endpoints: () => ({}),
});

type ProvidedItem = { id: number | string } | { uuid: string };

export function providesList<R extends ProvidedItem[], T extends typeof tagTypes[number]>(
  resultsWithIds: R | undefined,
  tagType: T,
) {
  return resultsWithIds
    ? [
        { type: tagType, id: 'LIST' },
        ...resultsWithIds.map(item => ({ type: tagType, id: 'id' in item ? item.id : item.uuid })),
      ]
    : [{ type: tagType, id: 'LIST' }];
}

export async function getFileUrlFromRes(res: Response) {
  if (!res.ok) return res.json();

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  return url;
}
