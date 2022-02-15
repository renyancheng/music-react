import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import store from "../../redux/store";

export default function RequireAuth({ children }) {
  const {
    auth: { isLogin },
  } = store.getState();

  const location = useLocation();

  return (
    <>
      {isLogin ? (
        <>{children}</>
      ) : (
        <Navigate to="/login" state={{ from: location.pathname }} />
      )}
    </>
  );
}
