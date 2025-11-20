import { useState } from "react";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import insatance from "../utils/axios";
import summary from "../common/summaryAPI";
import getErrorMessage from "../utils/axiosError";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await insatance.post(summary.login.url, {
        email: form.email,
        password: form.password,
      });

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);

        // refresh token -> localStorage  hona chahiye
        // access token -> cookies (httpOnly) hona chahiye

        // store tokens in localStorage
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);


        setForm({
          email: "",
          password: "",
        });
        navigate("/");
      }

      console.log("Login Response:", response);
    } catch (error) {
      getErrorMessage(error);
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label name="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label name="password" className="block mb-1 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500 text-xl"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p
              className="text-right text-sm text-red-600 cursor-pointer"
              onClick={() => navigate("/forget-password")}
            >
              Forget Password?
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 rounded-lg text-lg hover:bg-green-900 transition font-bold cursor-pointer active:scale-95"
          >
            Login
          </button>
        </form>

        <p className="text-center">
          Don't have an account?{" "}
          <span
            className="text-green-800 cursor-pointer hover:underline font-semibold"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
