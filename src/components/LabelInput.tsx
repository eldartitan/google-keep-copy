/** @format */

import React, { useState } from "react";
import { IconButton, InputBase, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { LabelContextType, useLabelContext } from "../context/LabelContext";


export default function LabelInput() {
  const { setLabel,  } = useLabelContext() as LabelContextType;
  const [inputText, setInputText] = useState("");

  const handleClick = () => {
    if (inputText.length) {
      setLabel(0, inputText);
    }
    setInputText("")
  }

  return (
    <>
      <Stack direction={"row"}>
        <IconButton>
          <ClearIcon sx={{ width: 20 }} />
        </IconButton>
        <InputBase
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          fullWidth={true}
          placeholder={"Создать ярлык"}
        />
        <IconButton onClick={handleClick}>
          <CheckIcon sx={{ width: 20 }} />
        </IconButton>
      </Stack>
    </>
  );
}
