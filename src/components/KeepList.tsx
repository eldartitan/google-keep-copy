/** @format */

import React from "react";
import { IKeep, KeepContextType, useKeepContext } from "../context";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { CardActionArea, CardActions, Chip, Dialog } from "@mui/material";
import EditModal from "../components/EditModal";
import KeepListPanel from "./KeepListPanel";
import moment from "moment";

interface propI {
  keep: IKeep;
}

export default function KeepList({ keep }: propI) {
  const { visibleKeep, setReminder, deleteLabel } = useKeepContext() as KeepContextType;

  const handleClickOpen = () => {
    visibleKeep(keep.id, true);
  };

  const handleClose = () => {
    visibleKeep(keep.id, false);
  };

  const handleDelete = () => {
    setReminder(keep.id, null);
  };

  return (
    <div key={keep.id}>
      <Dialog
        open={keep.status}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <EditModal keep={keep} handleClose={handleClose} />
      </Dialog>
      <Card
        sx={keep.status ? { visibility: "hidden" } : { visibility: "visible" }}
      >
        <CardActionArea onClick={handleClickOpen}>
          <CardContent>
            <Stack direction="row" alignItems="flex-start">
              <Typography width={"100%"} variant="h6">
                {keep.title}
              </Typography>
            </Stack>
            <Typography>{keep.description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {keep.reminder ? (
            <Chip
              label={moment(keep.reminder).format("DD MMM., HH:mm")}
              onDelete={handleDelete}
            />
          ) : null}
          {keep.labels?.map(label => <Chip label={label.text} onDelete={() => deleteLabel(keep.id, label)} />)}
        </CardActions>
        <CardActions>
          <Stack direction="row" justifyContent="space-between">
            <KeepListPanel keep={keep} key={keep.id} />
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
}
