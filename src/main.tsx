import { StrictMode } from "react";

import { ReactQueryClientProvider } from "@/providers/react-query-provider.tsx";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryClientProvider>
      <App />
    </ReactQueryClientProvider>
  </StrictMode>
);
