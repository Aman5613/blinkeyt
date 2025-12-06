import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./Admin";

// Lazy Components
const Home = lazy(() => import("../pages/Home"));
const Search = lazy(() => import("../pages/Search"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ForgetPass = lazy(() => import("../pages/ForgetPass"));
const OtpVerification = lazy(() => import("../pages/OtpVerification"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const UsermenuLayout = lazy(() => import("../layouts/UsermenuLayout"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const MainLayout = lazy(() => import("../layouts/mainLayout"));
const Myorder = lazy(() => import("../pages/Myorder"));
const Address = lazy(() => import("../pages/Address"));
const Category = lazy(() => import("../pages/Category"));
const SubCategory = lazy(() => import("../pages/SubCategory"));
const UploadProduct = lazy(() => import("../pages/UploadProduct"));
const Product = lazy(() => import("../pages/AdminProduct"));

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
            <Route
              path="category"
              element={
                <Admin>
                  <Category />
                </Admin>
              }
            />
            <Route
              path="subcategory"
              element={
                <Admin>
                  <SubCategory />
                </Admin>
              }
            />
            <Route
              path="upload-products"
              element={
                <Admin>
                  <UploadProduct />
                </Admin>
              }
            />
            <Route
              path="products"
              element={
                <Admin>
                  <Product />
                </Admin>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
