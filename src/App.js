import { Outlet, useNavigate } from "react-router-dom";
import "./App.scss";
import NavBar from "./components/Header/NavBar";
import { Scrollbars } from "react-custom-scrollbars-2";
// import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import { NavLink } from "react-router-dom";

function App() {
  // const background = useSelector((state) => state.theme.background);
  const [recipeList, setRecipeList] = useState([]);
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
        <Container className="home-content">
          <div className="left">
            <Button variant="warning" onClick={() => navigate("/add-recipe")}>
              New Recipe
            </Button>

            <hr />

            {recipeList &&
              recipeList.length > 0 &&
              recipeList.map((item) => {
                return (
                  <NavLink
                    to={`/detail/${item.id}`}
                    className="nav-link recipe"
                    key={item.id}
                  >
                    <div className="recipe-left">
                      <div className="name">{item.name}</div>
                      <div className="description">{item.description}</div>
                    </div>

                    <div className="recipe-right">
                      <Image src={item.image} />
                    </div>
                  </NavLink>
                );
              })}
          </div>

          <div className="right">
            <Outlet context={[recipeList, setRecipeList]} />
          </div>
        </Container>
      </Scrollbars>
    </div>
  );
}

export default App;
