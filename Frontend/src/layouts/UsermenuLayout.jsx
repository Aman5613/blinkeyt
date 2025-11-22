import React from "react";
import { Outlet } from "react-router-dom";
import Usermenu from "../components/Usermenu";

const UsermenuLayout = () => {
  return (
    <div>
      <div className="container mx-auto" style={{ minHeight: "100vh" }}>
        <div className="flex">
          {/* LEFT SIDEBAR (Sticky) */}
          <div className="hidden md:block w-64 sticky top-16 h-fit">
            <div className="hidden md:flex bg-white ">
              <Usermenu />
            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="flex-1 p-6 min-h-screen border-l border-gray-300">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsermenuLayout;
