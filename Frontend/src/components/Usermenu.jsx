import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import insatance from '../utils/axios'
import summary from "../common/summaryAPI";

const Usermenu = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const menuList = [
    {
      name: "Profile",
      url: "/profile",
    },
    {
      name: "Orders",
      url: "/orders",
    },
    {
      name: "Wishlist",
      url: "/wishlist",
    }
  ];

  const handleLogout = async () => {
    await insatance({
      ...summary.logout
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    localStorage.clear('accessTokeen')
    localStorage.clear('refreshToken')
  }

  return (
    <div className="bg-white w-48 shadow-lg rounded-lg p-4 z-50">
      <p className="font-semibold mb-3">Hello, {user?.name || "User"}</p>

      <ul className="space-y-1">
        {menuList?.map((item, index) => (
          <li
            key={index}
            className="py-2 px-2 cursor-pointer rounded-md hover:bg-gray-100 active:bg-gray-200 transition"
            onClick={() => navigate(item.url)}
          >
            {item.name}
          </li>
        ))}
        <li
          className="py-2 px-2 cursor-pointer rounded-md hover:bg-red-300 active:bg-gray-200 transition"
          onClick={() => handleLogout()}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Usermenu;
