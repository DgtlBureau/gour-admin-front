import { useNavigate, NavigateOptions, generatePath, Params } from 'react-router-dom';
import { Path } from '../constants/routes';

type Options = {
  params?: Params;
  query?: Params;
  state?: NavigateOptions['state'];
  replace?: NavigateOptions['replace'];
};

export const useTo = () => {
  const navigate = useNavigate();

  const getQueryParamsStr = (query: Params) => {
    const queryKeys = Object.keys(query);
    // eslint-disable-next-line
    return queryKeys.reduce((acc, p) => (acc += `${p}=${query[p]}&`), '?');
  };

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

  return to;
};
