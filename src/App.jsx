import React, { useState, forwardRef } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./layouts/Header";
import PlayerDialog from "./layouts/PlayerDialog";
import "./App.css";

export default function App() {
  return (
    <>
      <Header />
      <Container sx={{ mt: 10, mb: 2 }}>
        <Outlet />
      </Container>
      <PlayerDialog />
    </>
  );
}
