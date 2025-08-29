import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter} from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

console.log("Main.jsx is loading...");

try {
  const rootElement = document.getElementById("root");
  console.log("Root element found:", rootElement);
  
  if (!rootElement) {
    throw new Error("Root element not found!");
  }

  const root = createRoot(rootElement);
  console.log("React root created successfully");
  
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
  
  console.log("App rendered successfully");
} catch (error) {
  console.error("Error in main.jsx:", error);
  document.body.innerHTML = `
    <div style="min-height: 100vh; background: #0e0e10; color: white; display: flex; align-items: center; justify-content: center; padding: 1rem;">
      <div style="text-align: center;">
        <h1 style="color: #10B981; font-size: 2rem; margin-bottom: 1rem;">Error Loading App</h1>
        <p style="color: #9CA3AF; margin-bottom: 1rem;">${error.message}</p>
        <button onclick="window.location.reload()" style="background: #10B981; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; cursor: pointer;">
          Reload Page
        </button>
      </div>
    </div>
  `;
}
