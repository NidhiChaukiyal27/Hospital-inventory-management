import {
  FaChartPie,
  FaBoxes,
  FaHospital,
  FaTruck,
  FaClipboardList,
  FaFileAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isAdmin =
    user?.role === "admin";

  const isHospitalStaff =
    user?.role === "hospital_staff";

  return (
    <div className="w-64 min-h-screen bg-white border-r border-yellow-200 shadow-sm">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-yellow-500">
            HospitalIMS
        </h1>
      </div>

      <nav className="px-4 space-y-2">

        {/* Dashboard - everyone can see */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100 transition"
        >
          <FaChartPie />
          Dashboard
        </Link>

        {/* Admin only */}
        {isAdmin && (
          <>
            <Link
              to="/products"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100 transition"
            >
              <FaBoxes />
              Products
            </Link>

            <Link
              to="/hospitals"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100 transition"
            >
              <FaHospital />
              Hospitals
            </Link>

            <Link
              to="/reports"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100 transition"
            >
              <FaFileAlt />
              Reports
            </Link>
          </>
        )}

        {/* Both Admin and Hospital Staff */}
        {(isAdmin || isHospitalStaff) && (
          <>
            <Link
              to="/allocations"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100 transition"
            >
              <FaTruck />
              Allocations
            </Link>

            <Link
              to="/requisitions"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100 transition"
            >
              <FaClipboardList />
              Requisitions
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;