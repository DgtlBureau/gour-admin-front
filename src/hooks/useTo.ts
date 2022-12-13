import { NavigateOptions, Params, generatePath, useNavigate } from 'react-router-dom';

import { Path } from '../constants/routes';
import { getQueryParamsStr } from '../utils/getQueryParamsStr';

type Options = {
  params?: Params;
  query?: Params;
  state?: NavigateOptions['state'];
  replace?: NavigateOptions['replace'];
};

export const useTo = () => {
  const navigate = useNavigate();

  const to = (basePath: Path, path?: string, options?: Options) => {
    const base = basePath[0] === '/' ? basePath : `/${basePath}`;
    const navigateOptions = {
      pathname: `${generatePath(base + (path ? `/${path}` : ''), options?.params)}`,
      search: options?.query && getQueryParamsStr(options.query),
    };

    return navigate(navigateOptions, {
      state: options?.state,
      replace: options?.replace,
    });
  };

  const toSignIn = () => to(Path.AUTH, 'signin');
  const toSignUp = () => to(Path.AUTH, 'signup');

  const toStockList = () => to(Path.STOCKS);
  const toStockCreate = () => to(Path.STOCKS, 'create');
  const toStockEdit = (id: number) => to(Path.STOCKS, id.toString());

  const toUserList = () => to(Path.USERS);
  const toUserCreate = () => to(Path.USERS, 'create');
  const toUserEdit = (id: number) => to(Path.USERS, id.toString());

  const toProductList = () => to(Path.PRODUCTS);
  const toProductCreate = () => to(Path.PRODUCTS, 'create');
  const toProductEdit = (id: number) => to(Path.PRODUCTS, id.toString());

  const toPromoCodeList = () => to(Path.PROMO_CODES);
  const toPromoCodeCreate = () => to(Path.PROMO_CODES, 'create');
  const toPromoCodeEdit = (id: number) => to(Path.PROMO_CODES, id.toString());

  return {
    to,
    toSignIn,
    toSignUp,
    toStockList,
    toStockCreate,
    toStockEdit,
    toUserList,
    toUserCreate,
    toUserEdit,
    toProductList,
    toProductCreate,
    toProductEdit,
    toPromoCodeList,
    toPromoCodeCreate,
    toPromoCodeEdit,
  };
};
