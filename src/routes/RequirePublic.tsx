import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLocation } from '../hooks/useLocation';

type State = {
  from: { pathname: string };
};

export function RequirePublic({ children }: { children: JSX.Element }) {
  const location = useLocation<State>();
  const { isAuth, isFetching } = useAuth();
  const path = location.state?.from.pathname || '/';

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (isAuth) {
    return <Navigate to={path} state={{ from: location }} replace />;
  }

  return children;
}
