import { Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Incidents from "./pages/Incidents";
import Reports from "./pages/Reports";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";

import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />

          <Route
            path="/devices"
            element={<Devices />}
          />

          <Route
            path="/incidents"
            element={<Incidents />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />
        </Route>
      </Route>
    </Routes>
  );
}