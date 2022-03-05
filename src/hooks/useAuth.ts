import { useGetCurrentUserQuery } from '../api/userApi';

export const useAuth = () => {
  const { isSuccess, isFetching } = useGetCurrentUserQuery();
  return { isAuth: isSuccess, isFetching };
};
