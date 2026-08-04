import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store.js";
import { queryClient } from "./hooks/queryClient.js";
import AuthProvider from "./providers/AuthProvider.jsx";
import { CompareProvider } from "./context/CompareContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CompareProvider>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </CompareProvider>
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>,
);
