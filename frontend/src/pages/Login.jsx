import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import {
  Eye,
  EyeOff,
  PackagePlus,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [showPassword,
    setShowPassword] =
    useState(false);
  const [loading, setLoading] =
    useState(false);
  const [errors, setErrors] = useState({});
  const validate = () => {
    const e = {};

    if (!email.trim()) {
      e.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      e.email = "Enter a valid email";
    }

    if (!password) {
      e.password = "Password is required";
    } else if (password.length < 4) {
      e.password =
        "Password must be at least 4 characters";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      toast.success(
        "Login successful!"
      );

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-yellow-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-500">
            HospitalIMS
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-xl transition duration-300 disabled:opacity-70"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-400 text-sm">
          Hospital Inventory Management System
        </div>
      </div>
    </div>
  );
}

export default Login;