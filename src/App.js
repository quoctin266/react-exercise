import { Outlet, useNavigate } from "react-router-dom";
import "./App.scss";
import NavBar from "./components/Header/NavBar";
import { Scrollbars } from "react-custom-scrollbars-2";
// import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { useEffect } from "react";

function App() {
  // const background = useSelector((state) => state.theme.background);
  const navigate = useNavigate();

  useEffect(() => navigate("/recipes"), [navigate]);

  return (
    <div className="App">
      <NavBar />
      <Scrollbars
        style={{ height: "91vh" }}
        autoHide
        // Hide delay in ms
        autoHideTimeout={1000}
        // Duration for hide animation in ms.
        autoHideDuration={200}
      >
        <Container>
          <Outlet />
        </Container>
      </Scrollbars>
    </div>
  );
}

export default App;
