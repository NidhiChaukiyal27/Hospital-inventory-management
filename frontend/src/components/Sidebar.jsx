import {
  LayoutDashboard,
  Package,
  Building2,
  FileBarChart2,
  Truck,
  ClipboardList,
  X,
  HeartPulse,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen, collapsed }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.role === "admin";
  const isHospitalStaff = user?.role === "hospital_staff";

  const NAV = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, show: true },
    { to: "/products", label: "Products", icon: Package, show: isAdmin },
    { to: "/hospitals", label: "Hospitals", icon: Building2, show: isAdmin },
    { to: "/reports", label: "Reports", icon: FileBarChart2, show: isAdmin },
    { to: "/allocations", label: "Allocations", icon: Truck, show: isAdmin || isHospitalStaff },
    { to: "/requisitions", label: "Requisitions", icon: ClipboardList, show: isAdmin || isHospitalStaff },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="no-print md:hidden"
          style={{ position: "fixed", inset: 0, background: "rgba(34,29,15,0.45)", zIndex: 40 }}
        />
      )}

      <aside
        className={`no-print fixed md:static top-0 left-0 h-screen md:h-auto min-h-screen z-50 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          width: collapsed ? 72 : 232,
          background: "var(--ink)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "20px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              minWidth: 30,
              borderRadius: 7,
              background: "var(--yolk)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HeartPulse size={16} color="var(--ink)" />
          </div>
          {!collapsed && (
            <span style={{ fontFamily: "var(--font-display)", fontSize: 15, whiteSpace: "nowrap", overflow: "hidden" }}>
              HospitalIMS
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="md:hidden"
            style={{ marginLeft: "auto", background: "none", border: "none", color: "#fff", cursor: "pointer" }}
          >
            <X size={18} />
          </button>
        </div>

        <nav style={{ flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 3, overflowY: "auto" }}>
          {NAV.filter((item) => item.show).map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              title={collapsed ? label : undefined}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: collapsed ? "10px" : "10px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: 8,
                textDecoration: "none",
                background: isActive ? "var(--yolk)" : "transparent",
                color: isActive ? "var(--ink)" : "#D8D3B4",
                fontWeight: isActive ? 600 : 500,
                fontSize: 13.5,
              })}
            >
              <Icon size={17} style={{ flexShrink: 0 }} />
              {!collapsed && (
                <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
