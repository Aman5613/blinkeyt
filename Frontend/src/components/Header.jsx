import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from "react-redux";
import { IoMenu } from "react-icons/io5";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Usermenu from "./Usermenu";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useMobile();
  const location = useLocation();
  const user = useSelector((state) => state.user);


  const isSearchPage = location.pathname === "/s";

  const [mobileMenu, setMobileMenu] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState(false);

  const mobileMenuRef = useRef();
  const desktopMenuRef = useRef();

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenu(false);
      }
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(e.target)
      ) {
        setDesktopMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="min-h-16 flex flex-col items-center justify-center bg-white w-full gap-2  px-4 py-2 md:py-3 sticky top-0 ">
      {/* Hide header content on mobile search page */}
      {isMobile && isSearchPage ? null : (
        // Desktop and non-search page header content
        <div className="container w-full flex justify-between items-center">
          {/* logo */}
          <Link to="/" className="">
            <img src={logo} alt="Logo" className="w-30 md:w-50" />
          </Link>

          {/* search */}
          <div className="hidden md:flex  mx-4 ">
            <Search />
          </div>

          {/* login and add to cart */}
          <div className="relative">
            {/* MOBILE VIEW */}
            {user?.name ? (
              <div className="relative md:hidden">
                {/* Mobile Toggle Button */}
                <button
                  className="cursor-pointer"
                  onClick={() => setMobileMenu((prev) => !prev)}
                >
                  {mobileMenu ? <RxCross2 size={28} /> : <IoMenu size={28} />}
                </button>

                {/* Mobile Dropdown */}
                {mobileMenu && (
                  <div
                    ref={mobileMenuRef}
                    className="absolute top-12 right-0 z-50 bg-white shadow-lg rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Usermenu closeMenu={() => setMobileMenu(false)} />
                  </div>
                )}
              </div>
            ) : (
              <button className="md:hidden" onClick={() => navigate("/login")}>
                <FaRegUserCircle size={28} />
              </button>
            )}

            {/* DESKTOP VIEW */}
            <div className="hidden md:flex gap-4 items-center">
              {user?.name ? (
                <div className="relative">
                  <button
                    className="flex items-center gap-2 font-semibold bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                    onClick={() => setDesktopMenu((prev) => !prev)}
                  >
                    My Account
                    {desktopMenu ? <FaAngleUp /> : <FaAngleDown />}
                  </button>

                  {/* Desktop Dropdown */}
                  {desktopMenu && (
                    <div
                      ref={desktopMenuRef}
                      className="absolute top-12 left-0 z-50 bg-white shadow-lg rounded-lg"
                    >
                      <Usermenu close={() => setDesktopMenu(false)} />
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="font-semibold bg-yellow-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}

              {/* Cart */}
              <button className="flex items-center gap-2 bg-green-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-900 transition">
                <GiShoppingCart size={25} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile search bar */}
      <div className="container mx-auto w-full md:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
