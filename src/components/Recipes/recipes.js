import { Outlet, useNavigate } from "react-router-dom";
import "./recipes.scss";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Recipes = () => {
  const navigate = useNavigate();
  const recipeList = useSelector((state) => state.recipe.list);

  return (
    <div className="home-content">
      <div className="left">
        <Button
          variant="warning"
          onClick={() => navigate("/recipes/add-recipe")}
        >
          New Recipe
        </Button>

        <hr />

        {recipeList &&
          recipeList.length > 0 &&
          recipeList.map((item) => {
            return (
              <NavLink
                to={`/recipes/detail/${item.id}`}
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
        <Outlet context={[recipeList]} />
      </div>
    </div>
  );
};

export default Recipes;
