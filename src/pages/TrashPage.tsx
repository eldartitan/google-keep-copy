/** @format */

import React from "react";
import { IKeep, KeepContextType, useKeepContext } from "../context";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import {
  Button,
  CardActionArea,
  CardActions,
  Dialog,
} from "@mui/material";
import EditModal from "../components/EditModal";
import KeepListPanel from "../components/KeepListPanel";

export default function TrashPage() {
  const { keeps, visibleKeep, cleanTrash } =
    useKeepContext() as KeepContextType;
  console.log(keeps);

  const filtered = keeps.filter((keep) => keep.inTrash);

  const handleClickOpen = (id: number) => {
    visibleKeep(id, true);
  };

  const handleClose = (id: number) => {
    visibleKeep(id, false);
  };

  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ margin: "32px auto 16px auto", width: 600 }}
      >
        <Stack direction="row" alignItems="center" spacing={4}>
          <Typography fontStyle={"italic"}>
            Заметки удаляются из корзины через 7 дней.
          </Typography>
          {filtered.length ? (
            <Button variant="text" onClick={() => cleanTrash()}>
              Очистить корзину
            </Button>
          ) : null}
        </Stack>
        <Stack direction="column-reverse" spacing={2} sx={{ width: "100%" }}>
          {filtered.map((keep: IKeep) => {
            return (
              <div key={keep.id}>
                <Dialog
                  open={keep.status}
                  onClose={() => handleClose(keep.id)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <EditModal
                    keep={keep}
                    handleClose={() => handleClose(keep.id)}
                  />
                </Dialog>
                <Card
                  sx={
                    keep.status
                      ? { visibility: "hidden" }
                      : { visibility: "visible" }
                  }
                >
                  <CardActionArea onClick={() => handleClickOpen(keep.id)}>
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
                    <KeepListPanel keep={keep} />
                  </CardActions>
                </Card>
              </div>
            );
          })}
        </Stack>
      </Stack>
    </>
  );
}
