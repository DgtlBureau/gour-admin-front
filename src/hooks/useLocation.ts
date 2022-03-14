import * as router from 'react-router-dom';

export const useLocation = <T>() => {
  type L = router.Location & { state: T };
  return router.useLocation() as L;
};
