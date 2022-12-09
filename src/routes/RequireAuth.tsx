import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { selectIsAuth } from 'store/selectors/auth';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to='/auth/signin' state={{ from: location }} replace />;
  }

  return children;
}
