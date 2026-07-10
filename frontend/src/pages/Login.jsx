import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, HeartPulse } from "lucide-react";
import { toast } from "react-toastify";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};

    if (!email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = "Enter a valid email";
    }

    if (!password) {
      e.password = "Password is required";
    } else if (password.length < 4) {
      e.password = "Password must be at least 4 characters";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100dvh", display: "flex" }}>
      <div
        className="login-aside"
        style={{
          flex: 1,
          background: "var(--ink)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: "var(--yolk)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HeartPulse size={19} color="var(--ink)" />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 17 }}>HospitalIMS</span>
        </div>

        <div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 34, lineHeight: 1.25, maxWidth: 420, margin: 0 }}>
            Every ward supplied, every shortage seen coming.
          </p>
          <p style={{ color: "#C9C4A4", fontSize: 14.5, marginTop: 16, maxWidth: 380, lineHeight: 1.7 }}>
            Track central stock, allocations, and hospital requisitions across your network from a single dashboard.
          </p>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 13, color: "#9C9678" }}>
          <span>Hospital Inventory Management System</span>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
        <form onSubmit={handleSubmit} noValidate style={{ width: "100%", maxWidth: 360 }}>
          <h1 style={{ fontSize: 24, margin: "0 0 6px" }}>Sign in</h1>
          <p style={{ color: "var(--ink-soft)", fontSize: 13.5, margin: "0 0 28px" }}>
            Sign in to continue to your dashboard.
          </p>

          <div className="field">
            <label>Email</label>
            <input
              className={`input${errors.email ? " err" : ""}`}
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="field">
            <label>Password</label>
            <div style={{ position: "relative" }}>
              <input
                className={`input${errors.password ? " err" : ""}`}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: 42 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--ink-soft)",
                  display: "flex",
                }}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 12 }}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div style={{ marginTop: 28, textAlign: "center", color: "var(--ink-soft)", fontSize: 12.5 }}>
            Hospital Inventory Management System
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 860px) { .login-aside { display: none !important; } }
      `}</style>
    </div>
  );
}

export default Login;
