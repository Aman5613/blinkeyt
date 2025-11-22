import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import insatance from "../utils/axios";
import summary from "../common/summaryAPI";
import tost from "react-hot-toast";
import { logout } from "../store/userSlice";
import { RiExternalLinkFill } from "react-icons/ri";


const Usermenu = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuList = [
    {
      name: "My Orders",
      url: "/orders",
    },
    {
      name: "Addresses",
      url: "/addresses",
    },
  ];

  const handleLogout = async () => {
    try {
      await insatance({
        ...summary.logout,
      })
        .then((res) => {
          console.log("Loogout response : ", res.data);
          if (res.data.success) {
            localStorage.clear();

            dispatch(logout());

            tost.success("Logout Successfully");

            navigate("/");
          }
        })
        .catch((err) => {
          console.log("Logout error : ", err);
        });
    } catch (error) {
      console.log("Logout error : ", error);
      getErrorMessage(error.message || error);
    }
  };

  return (
    <div className="bg-white w-48 rounded-lg p-4 z-50">
      <p className="font-semibold mb-3 flex items-center gap-2">
        Hello, {user?.name || "User"}
        <RiExternalLinkFill className="hover:text-blue-500 cursor-pointer" onClick={() => navigate("/dashboard/profile")}/>
        </p>

      <ul className="space-y-1">
        {menuList?.map((item, index) => (
          <li
            key={index}
            className="py-2 px-2 cursor-pointer rounded-md hover:bg-gray-100 active:bg-gray-200 transition"
            onClick={() => navigate(`/dashboard/${item.url}`)}
          >
            {item.name}
          </li>
        ))}
        <li
          className="py-2 px-2 cursor-pointer rounded-md hover:bg-red-100 active:bg-gray-200 transition"
          onClick={() => handleLogout()}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Usermenu;
