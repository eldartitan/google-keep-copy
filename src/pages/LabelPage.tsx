/** @format */

import React from "react";
import { IKeep, KeepContextType, useKeepContext } from "../context";
import { Stack } from "@mui/system";
import KeepList from "../components/KeepList";
import { useParams } from "react-router-dom";

export default function LabelPage() {
  const { labelId } = useParams();
  const { keeps } = useKeepContext() as KeepContextType;
  const filtered = keeps.filter(keep => keep.labels.filter(label => label.text === labelId).length)

  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ margin: "32px auto 16px auto" }}
      >
        <Stack direction="column-reverse" spacing={2} sx={{ width: 600 }}>
          {filtered.map((keep: IKeep) => <KeepList keep={keep} key={keep.id} />)}
        </Stack>
      </Stack>
    </>
  );
}
