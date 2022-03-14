import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Path } from '../constants/routes';
import { useLocation } from '../hooks/useLocation';
import { selectIsAuth } from '../store/selectors/auth';

type State = {
  from: { pathname: string };
};

export function RequirePublic({ children }: { children: JSX.Element }) {
  const location = useLocation<State>();
  const isAuth = useSelector(selectIsAuth);
  const path = location.state?.from.pathname || Path.HOME;
  console.log('RequirePublic', path);

  if (isAuth) {
    return <Navigate to={path} state={{ from: location }} replace />;
  }

  return children;
}
