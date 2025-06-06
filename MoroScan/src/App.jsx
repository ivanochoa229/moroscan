import { BrowserRouter } from "react-router-dom";
import "../src/style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AppRouter from "./router/AppRouter";

function App() {

  return (
    <BrowserRouter>
      <div className="d-flex backPrincipal flex-column align-items-center justify-content-center vh-100">
        <div className="d-flex flex-column w-100 ">
          <AppRouter/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
