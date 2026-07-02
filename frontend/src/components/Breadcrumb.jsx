import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

function Breadcrumb() {
  
  const location = useLocation();

  const page =
    location.pathname.slice(1) ||
    "dashboard";

  const pageTitle =
    page.charAt(0).toUpperCase() +
    page.slice(1);
  
    if (page === "dashboard") {
      return null;
    }
  return (
    <div className="flex items-center gap-2 text-sm mb-8">
      <Link
        to="/dashboard"
        className="text-gray-500 hover:text-yellow-500 transition"
      >
        Dashboard
      </Link>

      <FaChevronRight
        className="text-gray-400 text-xs"
      />

      <span className="font-semibold text-yellow-600">
        {pageTitle}
      </span>
    </div>
  );
}

export default Breadcrumb;