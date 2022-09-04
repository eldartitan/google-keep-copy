/** @format */

import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import GridViewIcon from "@mui/icons-material/GridView";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../style/Keep.svg";
import MySearch from "./MySearch";
import { useLocation } from "react-router-dom";
import { Stack } from "@mui/material";

export default function SearchAppBar() {
  const location = useLocation();

  const getHeader = () => {
    if (location.pathname === "/") {
      return "Keep";
    } else if (location.pathname === "/reminders") {
      return "Напоминания";
    } else if (location.pathname === "/archive") {
      return "Архив";
    } else if (location.pathname === "/trash") {
      return "Корзина";
    } else if (location.pathname.includes("/label")) {
      return location.pathname.slice(7);
    }
  };

  return (
    <Box>
      <AppBar position="static" color="transparent" sx={{ boxShadow: 1 }}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              sx={{ mr: 1 }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            {location.pathname === "/" ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
              >
                <img src={logo} width={28} height={38} alt="" />
              </IconButton>
            ) : null}
            <Typography
              variant="h6"
              noWrap
              component="div"
              color={"#5f6368"}
              sx={{ mr: 10 }}
            >
              {getHeader()}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <MySearch />
          </Box>
          <Stack direction={"row"} spacing={5}>
            <Stack direction={"row"}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 1 }}
              >
                <RefreshIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 1 }}
              >
                <GridViewIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
              >
                <SettingsIcon />
              </IconButton>
            </Stack>
            <Stack direction={"row"}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 1 }}
              >
                <AppsIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
              >
                <PersonIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
