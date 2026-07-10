import { useState } from "react";
import { Menu, PanelLeftClose, PanelLeftOpen, LogOut, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar({ setSidebarOpen, collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const page = location.pathname.slice(1) || "dashboard";
  const pageTitle = page.charAt(0).toUpperCase() + page.slice(1);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header
      className="no-print"
      style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--line)" }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 22px", gap: 14 }}>
        <div className="flex items-center gap-3">
          <button
            className="md:hidden icon-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <button
            className="hidden md:flex icon-btn"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
          </button>

          <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--ink)" }} className="capitalize">
            {pageTitle}
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setMenuOpen((s) => !s)}
            style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 10 }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "var(--yolk-pale)",
                color: "var(--yolk-deep)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {initials}
            </div>
            <div style={{ textAlign: "left" }} className="hidden sm:block">
              <p style={{ fontWeight: 600, fontSize: 13.5, color: "var(--ink)", lineHeight: 1.2 }}>{user?.name}</p>
              <span className="badge badge-yolk" style={{ marginTop: 2 }}>{user?.role}</span>
            </div>
            <ChevronDown size={15} color="var(--ink-soft)" />
          </button>

          {menuOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 46,
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 12,
                boxShadow: "0 10px 30px rgba(34,29,15,0.14)",
                minWidth: 160,
                overflow: "hidden",
                zIndex: 40,
              }}
            >
              <button
                onClick={logout}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "11px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 13.5, color: "var(--red)", fontWeight: 600 }}
              >
                <LogOut size={15} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
