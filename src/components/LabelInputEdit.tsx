/** @format */

import React, { useState } from "react";
import { IconButton, InputBase, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from '@mui/icons-material/Delete';
import { LabelContextType, useLabelContext, Ilabel } from "../context/LabelContext";

interface propI {
  label: Ilabel;
}

export default function LabelInputEdit({label}: propI) {
  const { editLabel, deleteLabel } = useLabelContext() as LabelContextType;
  const [inputText, setInputText] = useState(label.text || "");

  const handleClick = () => {
    if (inputText.length) {
      editLabel(label.id, inputText);
    }
  }
  
  const handleClickDelete = () => {
    if (inputText.length) {
      deleteLabel(label.id);
    }
  }

  return (
    <>
      <Stack direction={"row"}>
        <IconButton onClick={handleClickDelete}>
          <DeleteIcon sx={{ width: 20 }} />
        </IconButton>
        <InputBase
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          fullWidth={true}
          placeholder={label.text || "Создать ярлык"}
        />
        <IconButton onClick={handleClick}>
          <CheckIcon sx={{ width: 20 }} />
        </IconButton>
      </Stack>
    </>
  );
}
