import { Params } from 'react-router-dom';

export const getQueryParamsStr = (query: Params) => {
  const queryKeys = Object.keys(query);
  // eslint-disable-next-line
  return queryKeys.reduce((acc, p) => (acc += `${p}=${query[p]}&`), '?');
};
