import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./layouts/Header";

export default function App() {
  return (
    <>
      <Header />
      <Container sx={{ mt: 10 }}>
        <Outlet />
      </Container>
    </>
  );
}
