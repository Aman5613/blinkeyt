import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Usermenu = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const menu = [
    {
        name : "Profile",
        url : "/profile"
    },
    {
        name : "Orders",
        url : "/orders"
    },
    {
        name : "Wishlist",
        url : "/wishlist"
    },
    {
        name : "Logout",
        url : "/logout"
    }
  ]

  
  return (
    <div className="absolute top-16 bg-white shadow-lg rounded-lg p-4">
      <p className="font-bold mb-2">Hello, {user.name}</p>
      <ul>
        {
            menu.map((e) => {
                return (
                  <li className="py-1 hover:bg-gray-100 cursor-pointer rounded-md px-2" onClick={() => navigate(`${e.url}`)}>
                    {e.name}
                  </li>
                );
            })
        }
        
      </ul>
    </div>
  );
};

export default Usermenu;
