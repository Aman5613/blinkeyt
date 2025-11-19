import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routers/appRoutes";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <main className="min-h-screen">
        <AppRoutes />
      </main>
      {/* <Footer /> */}
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
