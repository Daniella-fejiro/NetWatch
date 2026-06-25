import "@fontsource/inter";
import "@fontsource/space-grotesk";
import "@fontsource/jetbrains-mono";

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#00D9FF",
            color: "#111827",
            padding: "14px 18px",
            minWidth: "320px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
