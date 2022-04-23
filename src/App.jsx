import React, { useState, forwardRef } from "react";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "@mui/material";
import Header from "./layouts/Header";
import PlayerDialog from "./layouts/PlayerDialog";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

export const App = ({ songs }) => {
  return (
    <>
      <ScrollToTop>
        <Container sx={{ mt: 10, mb: 2 }}>
          <Outlet />
        </Container>
        {songs.length !== 0 && <PlayerDialog />}
      </ScrollToTop>
      <Header />
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
