import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routers/appRoutes";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Toaster } from "react-hot-toast";
import getuserdetails from "./utils/fetchuserDetails";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails} from "./store/userSlice.js"

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
      <Header />
      <main className="min-h-screen">
        <AppRoutes />
      </main>
      {/* <Footer /> */}
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
