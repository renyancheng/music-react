import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import RequireAuth from "./components/RequireAuth";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import Artist from "./pages/Artist";
import DiscoverPlaylist from "./pages/Discover/Playlist";
import DiscoverToplist from "./pages/Discover/Toplist";
import DiscoverArtist from "./pages/Discover/Artist";
import NotFound from "./pages/NotFound";

export const Router = ({ isLogin }) => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/user/home/:uid" element={<User />}></Route>
          <Route path="/playlist/:id" element={<Playlist />}></Route>
          <Route path="/artist/:id" element={<Artist />}></Route>
          <Route
            path="/discover/playlist"
            element={<DiscoverPlaylist />}
          ></Route>
          <Route path="/discover/toplist" element={<DiscoverToplist />}></Route>
          <Route path="/discover/artist" element={<DiscoverArtist />}></Route>
          <Route
            path="/login"
            element={<>{isLogin ? <Navigate to="/" /> : <Login />}</>}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default connect(
  ({ auth: { isLogin } }) => ({
    isLogin,
  }),
  {}
)(Router);
