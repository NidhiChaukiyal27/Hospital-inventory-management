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
  return (
    <div className="w-64 min-h-screen bg-white border-r border-yellow-200 shadow-sm">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-yellow-500">
          HospitalIMS
        </h1>
      </div>

      <nav className="px-4 space-y-2">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100"
        >
          <FaChartPie />
          Dashboard
        </Link>

        <Link
          to="/products"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100"
        >
          <FaBoxes />
          Products
        </Link>

        <Link
          to="/hospitals"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100"
        >
          <FaHospital />
          Hospitals
        </Link>

        <Link
          to="/allocations"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100"
        >
          <FaTruck />
          Allocations
        </Link>

        <Link
          to="/requisitions"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100"
        >
          <FaClipboardList />
          Requisitions
        </Link>

        <Link
          to="/reports"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100"
        >
          <FaFileAlt />
          Reports
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;