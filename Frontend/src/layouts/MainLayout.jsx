import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <div className="w-full min-h-screen">
        <header className="sticky top-0 z-50 border-b border-gray-100">
          <Header />
        </header>
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
