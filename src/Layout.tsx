/** @format */

import React from "react";
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <div style={{display: "flex"}}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
