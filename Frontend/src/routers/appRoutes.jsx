import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPass from "../pages/ForgetPass";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UsermenuLayout from "../layouts/UsermenuLayout";
import ProfilePage from "../pages/ProfilePage";
import MainLayout from "../layouts/mainLayout";
import Myorder from "../pages/Myorder";
import Address from "../pages/Address";
// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-800 border-t-transparent"></div>
  </div>
);

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPass />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="s" element={<Search />} />
          <Route path="dashboard" element={<UsermenuLayout />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<Myorder />} />
            <Route path="addresses" element={<Address />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
