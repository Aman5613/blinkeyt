import { useState } from "react";
import toast from "react-hot-toast";
import insatance from "../utils/axios";
import summary from "../common/summaryAPI";
import getErrorMessage from "../utils/axiosError";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
  });

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await insatance.put(summary.forgetPassword.url, {
        email: form.email,
      });

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setForm({
          email: "",
        });
        navigate(`/otp-verification?${form.email}`);
      }

    //   console.log("Forget Password Response:", response);
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 rounded-lg text-lg hover:bg-green-900 transition font-bold cursor-pointer active:scale-95"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
