import {
  createContext,
  useState,
  ReactNode,
  useContext,
  ChangeEvent,
} from "react";
import { scrollToTop } from "../functions/utils";

type PaginationContextData = {
  handlePagination: (event: ChangeEvent<unknown>, page: number) => void;
  page: number;
};

export const PaginationContext = createContext({} as PaginationContextData);

type PaginationContextProviderProps = {
  children: ReactNode;
};

export function PaginationContextProvider({
  children,
}: PaginationContextProviderProps) {
  const [page, setPage] = useState(1);

  const handlePagination = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    scrollToTop();
  };

  return (
    <PaginationContext.Provider value={{ page, handlePagination }}>
      {children}
    </PaginationContext.Provider>
  );
}

export const usePagination = () => {
  return useContext(PaginationContext);
};
