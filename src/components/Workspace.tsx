/** @format */

import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { Stack } from "@mui/system";
import { Button, ClickAwayListener, IconButton, Paper } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import { KeepContextType, useKeepContext } from "../context";

export default function Workspace() {
  const [keep, setKeep] = useState<any | undefined>("");
  const [keepTitle, setKeepTitle] = useState<any | undefined>("");
  const { saveKeep } = useKeepContext() as KeepContextType;
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);

  const handleClick = () => {
    if (keep.length || keepTitle.length) {
      saveKeep({
        id: 0,
        title: keepTitle,
        description: keep,
        status: false,
        inArchive: false,
        inTrash: false,
        reminder: null,
        labels: [],
      })
      setKeep("");
      setKeepTitle("");
    }
    setFocused(false);
  }


  return (
    <ClickAwayListener onClickAway={handleClick}>
      <Stack sx={{ margin: "32px auto 16px auto" }}>
        <Paper elevation={3} sx={{ width: 600 }}>
          <Stack>
            {focused ? (
                <Stack direction="row" alignItems="flex-start">
                  <InputBase
                    value={keepTitle}
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
            ) : null}
              <InputBase
                onFocus={onFocus}
                value={keep}
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
          {focused ? (
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2} sx={{ p: 1 }}>
                <IconButton>
                  <AddAlertOutlinedIcon sx={{ height: 20 }} />
                </IconButton>
                <IconButton>
                  <ArchiveOutlinedIcon sx={{ height: 20 }} />
                </IconButton>
                <IconButton>
                  <MoreVertIcon sx={{ height: 20 }} />
                </IconButton>
              </Stack>
              <Button
                onClick={handleClick}
                sx={{ color: "rgba(0,0,0,.87)", mr: 4 }}
              >
                Закрыть
              </Button>
            </Stack>
          ) : null}
        </Paper>
      </Stack>
    </ClickAwayListener>
  );
}
