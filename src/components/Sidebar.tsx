/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import LabelSide from "./LabelSide";
import { LabelContextType, useLabelContext } from "../context/LabelContext";

const style = {
  display: "flex",
  height: "48px",
  minWidth: "48px",
  alignItems: "center",
  paddingLeft: "12px",
  backgroundColor: "#ffffff",
  borderRadius: "0 25px 25px 0",
  "&:hover": {
    backgroundColor: "rgba(173,216,230, 0.18)",
  },
  border: 0,
  color: "#5f6368",
  textDecoration: "none",
};

const activeStyle = {
  display: "flex",
  height: "48px",
  minWidth: "48px",
  alignItems: "center",
  paddingLeft: "12px",
  backgroundColor: "#feefc3",
  color: "#202124",
  borderRadius: "0 25px 25px 0",
  "&:hover": {
    backgroundColor: "rgba(173,216,230, 0.18)",
  },
  border: 0,
  textDecoration: "none",
};

export default function Sidebar() {
  const { labels } = useLabelContext() as LabelContextType;
  return (
    <div style={{ width: "280px", paddingTop: "8px" }}>
      <NavLink
        to={""}
        style={({ isActive }) => (isActive ? activeStyle : style)}
      >
        <LightbulbOutlinedIcon sx={{ px: "12px" }} />
        <Typography variant="subtitle2" ml={"20px"}>
          Заметки
        </Typography>
      </NavLink>

      <NavLink
        to={"reminders"}
        style={({ isActive }) => (isActive ? activeStyle : style)}
      >
        <NotificationsNoneOutlinedIcon sx={{ px: "12px" }} />
        <Typography variant="subtitle2" ml={"20px"}>
          Напоминания
        </Typography>
      </NavLink>

      {labels.map((label) => 
        <NavLink
          to={`label/${label.text}`}
          style={({ isActive }) => (isActive ? activeStyle : style)}
        >
          <LabelOutlinedIcon sx={{ px: "12px" }} />
          <Typography variant="subtitle2" ml={"20px"}>
            {label.text}
          </Typography>
        </NavLink>
      )}

      <div style={style}>
        <LabelSide />
      </div>

      <NavLink
        to={"archive"}
        style={({ isActive }) => (isActive ? activeStyle : style)}
      >
        <ArchiveOutlinedIcon sx={{ px: "12px" }} />
        <Typography variant="subtitle2" ml={"20px"}>
          Архив
        </Typography>
      </NavLink>

      <NavLink
        to={"trash"}
        style={({ isActive }) => (isActive ? activeStyle : style)}
      >
        <DeleteOutlineOutlinedIcon sx={{ px: "12px" }} />
        <Typography variant="subtitle2" ml={"20px"}>
          Корзина
        </Typography>
      </NavLink>
    </div>
  );
}
