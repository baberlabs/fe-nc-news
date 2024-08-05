import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { LoggedInUserProvider } from "./contexts/LoggedInUserProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoggedInUserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LoggedInUserProvider>,
);
