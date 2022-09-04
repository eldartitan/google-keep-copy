/** @format */

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Button,
  ButtonBase,
  Stack,
} from "@mui/material";
import { LabelContextType, useLabelContext } from "../context/LabelContext";
import LabelInput from "../components/LabelInput";
import LabelInputEdit from "../components/LabelInputEdit";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
};

export default function LabelSide() {
  const { labels } = useLabelContext() as LabelContextType;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ButtonBase onClick={handleOpen}>
        <EditOutlinedIcon sx={{ px: "12px" }} />
        <Typography variant="subtitle2" ml={"20px"}>
          Изменение ярлыков
        </Typography>
      </ButtonBase>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack sx={{ p: "15px" }}>
            <Typography fontSize={"1rem"}>Изменение ярлыков</Typography>
            <LabelInput />
            {labels.map((label) => {
              return (
                <LabelInputEdit label={label} />
              );
            })}
          </Stack>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button onClick={handleClose} sx={{ color: "rgba(0,0,0,.87)", m: 1}}>Готово</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
