/** @format */

import React from "react";
import { IKeep, KeepContextType, useKeepContext } from "../context";
import { Stack } from "@mui/system";
import KeepList from "../components/KeepList";

export default function ArchivePage() {
  const { keeps } = useKeepContext() as KeepContextType;

  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ margin: "32px auto 16px auto" }}
      >
        <Stack direction="column-reverse" spacing={2} sx={{ width: 600 }}>
          {keeps.map((keep: IKeep) => <KeepList keep={keep} key={keep.id} />)}
        </Stack>
      </Stack>
    </>
  );
}
