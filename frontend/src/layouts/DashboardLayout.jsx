import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";

function DashboardLayout({
  children,
}) {
  const [sidebarOpen,
    setSidebarOpen] =
    useState(false);

  const [collapsed,
    setCollapsed] =
    useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        sidebarOpen={
          sidebarOpen
        }
        setSidebarOpen={
          setSidebarOpen
        }
        collapsed={
          collapsed
        }
      />

      <div className="flex-1">
        <Navbar
          setSidebarOpen={
            setSidebarOpen
          }
          collapsed={
            collapsed
          }
          setCollapsed={
            setCollapsed
          }
        />

        <main className="bg-[#FFFDF5] min-h-screen p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;