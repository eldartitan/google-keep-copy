/** @format */

import React, { useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { Stack } from "@mui/system";
import { Button, Chip, IconButton, Paper, Tooltip } from "@mui/material";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import { IKeep, KeepContextType, useKeepContext } from "../context";
import MorePopover from "./MorePopover";
import moment from "moment";

export interface propI {
  keep: IKeep;
  handleClose: () => void;
}

const EditModal: React.FC<propI> = ({ keep, handleClose }) => {
  const [keepText, setKeep] = useState<string | undefined>(keep?.description);
  const [keepTitle, setKeepTitle] = useState<string | undefined>(keep?.title);
  const { editKeep, inArchiveKeep, deleteLabel, setReminder } =
    useKeepContext() as KeepContextType;

  useEffect(() => {
    if (keep) {
      editKeep(keep.id, keepText, keepTitle);
    }
  }, [keepText, keepTitle]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleClose();
  };

  const handleDelete = () => {
    setReminder(keep.id, null);
  };

  const onClickArchive = () => {
    inArchiveKeep(keep.id, true);
    handleClose();
  };

  return (
    <Paper elevation={3} sx={{ width: 600 }}>
      <Stack>
        <Stack direction="row" alignItems="flex-start">
          <InputBase
            value={keep?.title}
            onChange={(e) => setKeepTitle(e.target.value)}
            placeholder="Введите заголовок..."
            fullWidth={true}
            multiline={true}
            inputProps={{
              maxLength: 1000,
            }}
            sx={{
              padding: "8px 16px",
              minHeight: 46,
              wordWrap: "break-word",
              lineHeight: "1.5rem",
              fontWeight: "500",
            }}
          ></InputBase>
          <IconButton>
            <PushPinOutlinedIcon />
          </IconButton>
        </Stack>
        <InputBase
          value={keep?.description}
          onChange={(e) => setKeep(e.target.value)}
          placeholder="Заметка..."
          fullWidth={true}
          multiline={true}
          maxRows={25}
          sx={{
            padding: "8px 16px",
            wordWrap: "break-word",
            lineHeight: "1.25rem",
            fontSize: ".875rem",
            fontWeight: "400",
          }}
        ></InputBase>
      </Stack>
      <Stack direction={"row"}>
        {keep.reminder ? (
          <Chip
            label={moment(keep.reminder).format("DD MMM., HH:mm")}
            // onClick={handleClick}
            onDelete={handleDelete}
          />
        ) : null}
        {keep.labels?.map((label) => (
          <Chip label={label.text} onDelete={() => deleteLabel(keep.id, label)} />
        ))}
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2} sx={{ p: 1 }}>
          <Tooltip title={"Сохранить напоминание"}>
            <IconButton>
              <AddAlertOutlinedIcon sx={{ height: 20 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Архивировать"}>
            <IconButton onClick={onClickArchive}>
              <ArchiveOutlinedIcon sx={{ height: 20 }} />
            </IconButton>
          </Tooltip>
          <MorePopover keep={keep} />
        </Stack>
        <Button onClick={handleClick} sx={{ color: "rgba(0,0,0,.87)", mr: 4 }}>
          Закрыть
        </Button>
      </Stack>
    </Paper>
  );
};
export default EditModal;
