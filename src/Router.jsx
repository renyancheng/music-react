import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import NotFound from "./pages/NotFound";

export default function Router() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/user/home/:id" element={<User />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}
