import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { GiShoppingCart } from "react-icons/gi";

const Header = () => {
  const naviagte = useNavigate();
  const isMobile = useMobile();
  const location = useLocation();

  const isSearchPage = location.pathname === "/s";

  // console.log("isMobile", isMobile);

  return (
    <header className="min-h-16 flex flex-col items-center justify-center bg-white w-full gap-2  px-4 py-2 md:py-3 border-gray-300 sticky top-0 ">
      
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
          <div className="">
            
            {/* // button for mobile view */}
            <button className="md:hidden">
              <FaRegUserCircle size={28} />
            </button>

            {/* login and cart for desktop view */}
            <div className="hidden md:flex gap-2 items-center">
              <div className="font-bold hover:bg-yellow-600 active:scale-95 cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded-lg" onClick={() => naviagte("/login")}>Login</div>
              <div className="flex gap-2 bg-green-800 hover:bg-green-900 cursor-pointer text-white px-4 py-2 rounded-lg font-bold active:scale-95 transition-transform">
                <GiShoppingCart size={25} className="" />
                {/* <p>My cart</p> */}
              </div>
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
