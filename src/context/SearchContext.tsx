/** @format */

import React, { createContext, FC, ReactNode, useContext, useState } from "react";

interface Props {
  children?: ReactNode
}

export type SearchContextType = {
  searchText: string;
  setSearch: (text: string) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchContextProvider: FC<Props> = ({ children }) => {
  const [searchText, setSearchText] = useState<string>("");

  const setSearch = (text: string) => {
    setSearchText(text);
  };

  return (
    <SearchContext.Provider
      value={{
        searchText,
        setSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
