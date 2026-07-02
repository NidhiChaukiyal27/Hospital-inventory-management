import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-white border-b border-yellow-200 h-16 px-8 flex items-center justify-between">
      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <div>
          <p className="font-medium">
            {user?.name}
          </p>

          <span className="text-sm text-yellow-600">
            {user?.role}
          </span>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;