/** @format */

import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { IKeep, KeepContextType, useKeepContext } from "../context";
import { LabelContextType, useLabelContext } from "../context/LabelContext";

export interface propI {
  keep: IKeep;
}

const style = { ":hover": { backgroundColor: "rgb(0,0,0, 0.1)" } };

export default function MyPopover({ keep }: propI) {
  const { labels } = useLabelContext() as LabelContextType;
  const { inTrashKeep, saveKeep, setLabel } = useKeepContext() as KeepContextType;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [anchorEl2, setAnchorEl2] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = () => {
    setAnchorEl2(anchorEl);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const id = open ? "simple-popover" : undefined;

  const onclickDelete = () => {
    inTrashKeep(keep.id, true);
  };

  const onClickCopy = () => {
    saveKeep(keep);
    handleClose();
  };

  return (
    <div>
      <Tooltip title={"Еще"}>
        <IconButton aria-describedby={id} onClick={handleClick}>
          <MoreVertIcon sx={{ height: 20 }} />
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
        <MenuList sx={{ width: 260 }}>
          <MenuItem onClick={onclickDelete} sx={style}>
            <Typography fontSize="14px">Удалить заметку</Typography>
          </MenuItem>
          <MenuItem onClick={handleClick2} sx={style}>
            <Typography fontSize="14px">Добавить ярлык</Typography>
          </MenuItem>
          <MenuItem onClick={onClickCopy} sx={style}>
            <Typography fontSize="14px">Создать копию</Typography>
          </MenuItem>
        </MenuList>
      </Popover>
      <Popover
        id={id}
        open={open2}
        anchorEl={anchorEl2}
        onClose={handleClose2}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuList sx={{ width: 225 }}>
          <Typography fontSize={14} sx={{ px: 2 }}>
            Добавить ярлык
          </Typography>
          {labels.map((label) => {
            return (
              <MenuItem onClick={() => setLabel(keep.id, label)} sx={style}>
                <Typography fontSize="14px">{ label.text }</Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Popover>
    </div>
  );
}
