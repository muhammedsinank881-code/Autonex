import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { store } from "./redux/store.js";
import { queryClient } from "./hooks/queryClient.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>,
);
