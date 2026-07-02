import { FaBars } from "react-icons/fa";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function Navbar({
  setSidebarOpen,
  collapsed,
  setCollapsed,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );
  const page =
  location.pathname.slice(1) ||
  "dashboard";
  const pageTitle =
  page.charAt(0).toUpperCase() +
  page.slice(1);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    
  };

  return (
    <div className="bg-white border-b border-yellow-200 h-20 px-6 flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center gap-4">

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() =>
            setSidebarOpen(true)
          }
        >
          <FaBars
            size={22}
            className="text-gray-700"
          />
        </button>

        {/* Desktop Collapse Button */}
        <button
          className="hidden md:block"
          onClick={() =>
            setCollapsed(
              !collapsed
            )
          }
        >
          <FaBars
            size={20}
            className="text-gray-700"
          />
        </button>

        {/* Page Title */}
        <h2 className="text-3xl font-bold text-gray-800 capitalize">
            {pageTitle}
        </h2>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-lg">
            {user?.name}
          </p>

          <span className="text-yellow-600 text-sm capitalize">
            {user?.role}
          </span>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;