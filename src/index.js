import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { fetPostsAsync } from "./store/reducers/post";
import "./helpers/i18n";

const container = document.getElementById("root");
const root = createRoot(container);
store.dispatch(fetPostsAsync());
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
