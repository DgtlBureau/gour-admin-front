import { useNavigate, NavigateOptions, generatePath, Params } from 'react-router-dom';
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

  return to;
};
