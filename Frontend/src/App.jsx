import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routers/appRoutes";
import Header from "../components/Header";

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
