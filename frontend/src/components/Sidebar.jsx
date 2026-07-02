import {
  FaChartPie,
  FaBoxes,
  FaHospital,
  FaTruck,
  FaClipboardList,
  FaFileAlt,
  FaTimes,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  collapsed,
}) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isAdmin =
    user?.role === "admin";

  const isHospitalStaff =
    user?.role === "hospital_staff";

  return (
    <div
      className={`
        fixed md:static
        z-50
        min-h-screen
        bg-white
        border-r
        border-yellow-200
        shadow-sm
        transition-all
        duration-300
        ${collapsed ? "w-20" : "w-64"}
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        {!collapsed && (
          <h1 className="text-3xl font-bold text-yellow-500">
            HospitalIMS
          </h1>
        )}

        {/* Close button on mobile */}
        <button
          className="md:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        >
          <FaTimes />
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-4 space-y-2">

        {/* Dashboard */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100 transition"
        >
          <FaChartPie />
          {!collapsed && "Dashboard"}
        </Link>

        {/* Admin Only */}
        {isAdmin && (
          <>
            <Link
              to="/products"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100 transition"
            >
              <FaBoxes />
              {!collapsed && "Products"}
            </Link>

            <Link
              to="/hospitals"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100 transition"
            >
              <FaHospital />
              {!collapsed && "Hospitals"}
            </Link>

            <Link
              to="/reports"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100 transition"
            >
              <FaFileAlt />
              {!collapsed && "Reports"}
            </Link>
          </>
        )}

        {/* Admin + Hospital Staff */}
        {(isAdmin ||
          isHospitalStaff) && (
          <>
            <Link
              to="/allocations"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100 transition"
            >
              <FaTruck />
              {!collapsed &&
                "Allocations"}
            </Link>

            <Link
              to="/requisitions"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100 transition"
            >
              <FaClipboardList />
              {!collapsed &&
                "Requisitions"}
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;