/** @format */

import React from "react";
import { Stack } from "@mui/system";
import { IconButton, Tooltip } from "@mui/material";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import MorePopover from "./MorePopover";
import { IKeep, KeepContextType, useKeepContext } from "../context";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReminderPopover from "./ReminderPopover";

export interface propI {
  keep: IKeep;
}

export default function KeepListPanel({ keep }: propI) {
  const { inArchiveKeep, inTrashKeep, deleteKeep } =
    useKeepContext() as KeepContextType;

  return (
    <>
      {!keep.inTrash ? (
        <Stack direction="row" spacing={2} sx={{ p: 1 }}>
          <ReminderPopover keep={keep} />
          {!keep.inArchive ? (
            <Tooltip title={"Архивировать"}>
              <IconButton onClick={() => inArchiveKeep(keep.id, true)}>
                <ArchiveOutlinedIcon sx={{ height: 20 }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title={"Вернуть из архива"}>
              <IconButton onClick={() => inArchiveKeep(keep.id, false)}>
                <UnarchiveOutlinedIcon sx={{ height: 20 }} />
              </IconButton>
            </Tooltip>
          )}
          <MorePopover keep={keep} />
        </Stack>
      ) : (
        <Stack direction="row" spacing={2} sx={{ p: 1 }}>
          <Tooltip title={"Удалить навсегда"}>
            <IconButton onClick={() => deleteKeep(keep.id)}>
              <DeleteForeverIcon sx={{ height: 20 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Восстановить"}>
            <IconButton onClick={() => inTrashKeep(keep.id, false)}>
              <RestoreFromTrashIcon sx={{ height: 20 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </>
  );
}
