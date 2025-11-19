import { TypeAnimation } from "react-type-animation";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useMobile from "../hooks/useMobile";
import { FaArrowLeft } from "react-icons/fa";


const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMobile();
  
  const [isSearchPage, setisSearchPage] = useState(false);
  useEffect(() => {
    setisSearchPage(location.pathname === "/s" ? true : false);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/s");
  };
  return (
    <div className="flex items-center  bg-slate-50 min-w-[300px] h-10 md:min-w-[450px] lg:min-w-[600px] border rounded-lg border-neutral-300 overflow-hidden p-1 text-neutral-500">
      <button className="flex px-2 items-center justify-center h-full text-neutral-600">
        {/* <IoSearch size={20} /> */}
        {
          isMobile && isSearchPage ? (
            <FaArrowLeft size={20} onClick={() => navigate(-1)} />
          ) : (
            <IoSearch size={20} />
          )
        }
      </button>
      <div className="w-full h-full flex items-center">
        {!isSearchPage ? (
          // not in search page
          <div
            className="w-full h-full flex items-center"
            onClick={redirectToSearchPage}
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "panner"',
                1000,
                'Search "sugar"',
                1000,
                'Search "bread"',
                1000,
                'Search "milk"',
                1000,
                'Search "aata"',
                1000,
                'Search "chini"',
                1000,
                'Search "jira"',
                1000,
                'Search "curd"',
                1000,
                'Search "tel"',
                1000,
                'Search "water"',
                1000,
                'Search "sabji"',
                1000,
                'Search "souce"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          // in search page
          <div className="w-full h-full flex items-center">
            <input
              type="text"
              placeholder="Search for aata, dal and more..."
              className="w-full h-full outline-none text-black"
              autoFocus={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
