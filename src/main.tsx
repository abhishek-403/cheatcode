import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "../src/index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { store } from "./store";
import ToastProvider from "./utils/toastProvider";
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <NextUIProvider>
      <App />
      <ToastProvider />
    </NextUIProvider>
  </Provider>
);
