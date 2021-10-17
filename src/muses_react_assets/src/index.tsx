import { render } from "react-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";

render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.getElementById("app")
);
