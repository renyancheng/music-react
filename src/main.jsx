import React from "react";
import ReactDOM from "react-dom";
import Providers from "./Providers"
import Router from "./Router"
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <Router />
    </Providers>
  </React.StrictMode>,
  document.getElementById("root")
);
