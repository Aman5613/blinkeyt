import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Search from "../src/pages/Search";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
  </div>
);

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/s" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
