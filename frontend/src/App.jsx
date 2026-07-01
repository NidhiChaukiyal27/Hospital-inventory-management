import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/allocations" element={<Allocations />} />
        <Route path="/requisitions" element={<Requisitions />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
}

export default App;