import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isAuth, isFetching } = useAuth();

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (!isAuth) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return children;
}
