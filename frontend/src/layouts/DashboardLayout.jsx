import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} collapsed={collapsed} />

      <div className="app-main">
        <Navbar
          setSidebarOpen={setSidebarOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
