import { useState, useRef, use, useEffect } from "react";
import toast from "react-hot-toast";
import insatance from "../utils/axios";
import summary from "../common/summaryAPI";
import getErrorMessage from "../utils/axiosError";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const email = window.location.search.slice(1);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input automatically
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace move
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Combine OTP and send to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Enter full 6-digit OTP");
      return;
    }

    try {
      const res = await insatance.put(summary.verifyOtp.url, {
        email: email,
        otp: finalOtp,
      });

      if (res.data.error) {
        toast.error(res.data.error);
        return;
      }

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/reset-password?${email}`);
      }

    } catch (err) {
      getErrorMessage(err);
    }
  };

  // handle resend OTP
  const handleresendOTP = async () => {
    try {
      const response = await insatance(summary.forgetPassword.url, {
        method: summary.forgetPassword.method,
        data: {
          email: email,
        },
      });

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      if (response.data.success) {
        toast.success("OTP resent successfully!");
      }
    } catch (error) {
      getErrorMessage(error);
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Enter OTP Code
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Fields */}
          <div className="flex justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            ))}
          </div>

          <p
            className="text-right text-sm text-black hover:underline cursor-pointer"
            onClick={() => handleresendOTP()}
          >
            Resend OTP ? 
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 rounded-lg text-lg hover:bg-green-900 active:scale-95 transition cursor-pointer font-bold tracking-wider"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
