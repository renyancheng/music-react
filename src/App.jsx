import React, { useState, forwardRef } from "react";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "@mui/material";
import Header from "./layouts/Header";
import PlayerDialog from "./layouts/PlayerDialog";
import "./App.css";

export const App = ({ songs }) => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 10, mb: 2 }}>
        <Outlet />
      </Container>
      {songs.length !== 0 && <PlayerDialog />}
    </>
  );
};

export default connect(
  ({
    player: {
      songs,
      setting: { current },
    },
  }) => ({
    songs,
    current,
  })
)(App);
