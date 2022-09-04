/** @format */

import React, { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import { SearchContextType, useSearchContext } from "../context/SearchContext";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    "&:focus": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
      boxShadow: 1,
      border: 1,
    },
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "75ch",
    [theme.breakpoints.down("lg")]: {
      width: "45ch",
    },
  },
}));


export default function SearchInput() {
  let navigate = useNavigate();

  const { searchText, setSearch } = useSearchContext() as SearchContextType;
  console.log(searchText)

  useEffect(() => {
    if (searchText.length) {
      navigate("/search")
    }
  }, [searchText])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <>
      <StyledInputBase
        value={searchText}
        onChange={onChange}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </>
  );
}
