/** @format */

import React from "react";
import { SearchContextType, useSearchContext } from "../context/SearchContext";
import { IKeep, KeepContextType, useKeepContext } from "../context";
import { Stack } from "@mui/system";
import KeepList from "../components/KeepList";

export default function SearchPage() {
  const { searchText } = useSearchContext() as SearchContextType;
  const { keeps } = useKeepContext() as KeepContextType;

  const filtered = keeps.filter(
    (keep) =>
      keep.description.includes(searchText) || keep.title.includes(searchText),
  );

  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ margin: "32px auto 16px auto" }}
      >
        <Stack direction="column-reverse" spacing={2} sx={{ width: 600 }}>
          {filtered.map((keep: IKeep) => {
            if (!keep.inTrash && !keep.inArchive && searchText.length) {
              return <KeepList keep={keep} key={keep.id} />;
            }
          })}
        </Stack>
      </Stack>
    </>
  );
}
