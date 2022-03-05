import { ReactNode } from 'react';
import { useOutletContext } from 'react-router-dom';

type OutletHeaderContext = {
  setHeaderContent: (content: ReactNode) => void;
};

export const useHeaderContent = () => useOutletContext<OutletHeaderContext>();
