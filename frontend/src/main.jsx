import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MusicProvider } from "./context/MusicContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MusicProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MusicProvider>
  </StrictMode>,
);
