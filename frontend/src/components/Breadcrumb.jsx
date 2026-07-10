import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function Breadcrumb() {
  const location = useLocation();

  const page = location.pathname.slice(1) || "dashboard";
  const pageTitle = page.charAt(0).toUpperCase() + page.slice(1);

  if (page === "dashboard") {
    return null;
  }

  return (
    <div style={{ fontSize: 12.5, color: "var(--ink-soft)", display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
      <Link to="/dashboard" style={{ color: "var(--ink-soft)", textDecoration: "none" }}>
        Dashboard
      </Link>
      <ChevronRight size={12} />
      <span style={{ color: "var(--ink)", fontWeight: 600 }}>{pageTitle}</span>
    </div>
  );
}

export default Breadcrumb;
