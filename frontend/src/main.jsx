import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </Provider>
  </BrowserRouter>,
);
