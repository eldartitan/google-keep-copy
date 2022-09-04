/** @format */

import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { IconButton, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { IKeep, KeepContextType, useKeepContext } from "../context";

export interface propI {
  keep: IKeep;
}

const style = { ":hover": { backgroundColor: "rgb(0,0,0, 0.1)" }, my: 1 };

export default function ReminderPopover({ keep }: propI) {
  const { setReminder } = useKeepContext() as KeepContextType;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const onClickDate = ( day: number, hour: number, min: number) => {
    const date = new Date();
    let dateDay = date.getDate();
    date.setDate(dateDay + day);
    date.setHours(hour);
    date.setMinutes(min);
    setReminder(keep.id, date);
    handleClose();
  };

  return (
    <div>
      <Tooltip title={"Сохранить напоминание"}>
        <IconButton aria-describedby={id} onClick={handleClick}>
          <AddAlertOutlinedIcon sx={{ height: 20 }} />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ boxShadow: 0 }}
      >
        <Paper sx={{ width: 300, maxWidth: "100%" }}>
          <MenuList>
            <li>
              <Typography sx={{ fontSize: "14px", p: 2 }}>
                Напоминание:
              </Typography>
            </li>
            <MenuItem
              // onClick={onclickDelete}
              sx={style}
            >
              <ListItemText onClick={() => onClickDate(0, 20, 0)}>
                <Typography sx={{ fontSize: "13px" }}>Сегодня</Typography>
              </ListItemText>
              <Typography
                sx={{ fontSize: "13px", color: "rgba(60,64,67,0.541)" }}
              >
                20:00
              </Typography>
            </MenuItem>
            <MenuItem sx={style}>
              <ListItemText onClick={() => onClickDate(1, 8, 0)}>
                <Typography sx={{ fontSize: "13px" }}>Завтра</Typography>
              </ListItemText>
              <Typography
                sx={{ fontSize: "13px", color: "rgba(60,64,67,0.541)" }}
              >
                08:00
              </Typography>
            </MenuItem>
            <MenuItem
              // onClick={onClickCopy}
              sx={style}
            >
              <ListItemText onClick={() => onClickDate(7, 8, 0)}>
                <Typography sx={{ fontSize: "13px" }}>
                  На следующей неделе
                </Typography>
              </ListItemText>
              <Typography
                sx={{ fontSize: "13px", color: "rgba(60,64,67,0.541)" }}
              >
                Пн, 08:00
              </Typography>
            </MenuItem>
            <MenuItem
              // onClick={onClickCopy}
              sx={style}
            >
              <Stack direction={"row"} alignItems="center" spacing={1}>
                <AccessTimeIcon sx={{ width: "1rem" }} />
                <Typography sx={{ fontSize: "13px" }}>
                  Выбрать дату и время
                </Typography>
              </Stack>
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>
    </div>
  );
}
