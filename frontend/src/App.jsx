import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Hospitals from "./pages/Hospitals";
import Allocations from "./pages/Allocations";
import Requisitions from "./pages/Requisitions";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hospitals"
          element={
            <ProtectedRoute>
              <Hospitals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/allocations"
          element={
            <ProtectedRoute>
              <Allocations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/requisitions"
          element={
            <ProtectedRoute>
              <Requisitions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
}

export default App;