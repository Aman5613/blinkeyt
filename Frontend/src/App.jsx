import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routers/appRoutes";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
