import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "antd/dist/reset.css";
import "./styles/global.css";

import App from "./App";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/ecommerce">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
