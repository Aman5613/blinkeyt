import { useState } from "react";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import insatance from "../utils/axios";
import summary from "../common/summaryAPI";
import getErrorMessage from "../utils/axiosError";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const email = window.location.search.slice(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit (you can replace alert with API call)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await insatance(summary.resetPassword.url, {
        method: summary.resetPassword.method,
        data: {
          email: email,
          newPassword: form.password,
          confirmnewPassword: form.confirmPassword,
        },
      });

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setForm({
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }

      console.log("Registration Response:", response);
    } catch (error) {
      getErrorMessage(error);
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

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
                className="absolute right-3 top-2 text-gray-500 text-xl cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label name="confirmPassword" className="block mb-1 font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2 text-gray-500 text-xl cursor-pointer"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 rounded-lg text-lg hover:bg-green-900 transition font-bold cursor-pointer active:scale-95"
          >
            Reset Password
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default ResetPassword;
