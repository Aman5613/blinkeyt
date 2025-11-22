import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routers/appRoutes";
import { Toaster } from "react-hot-toast";
import getuserdetails from "./utils/fetchuserDetails";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice.js";

const App = () => {
  const dispatch = useDispatch();
  const getUserDetails = async () => {
    const user = await getuserdetails();
    // console.log("User details in App.jsx", user);
    dispatch(setUserDetails(user));
    // return user;
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <BrowserRouter>
      <main>
        <AppRoutes />
      </main>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
