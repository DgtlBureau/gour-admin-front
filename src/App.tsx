import React, { useEffect } from 'react';

import { useGetCurrentUserQuery } from './api/authApi';
import { useAppDispatch } from './hooks/store';
import { Routing } from './routes/routes';
import { setIsAuth, setIsFetching } from './store/slices/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const { isSuccess, isFetching } = useGetCurrentUserQuery();

  useEffect(() => {
    dispatch(setIsAuth(isSuccess));
    dispatch(setIsFetching(isFetching));
  }, [isSuccess, isFetching]);

  if (isFetching) return null;
  return <Routing />;
}

export default App;
