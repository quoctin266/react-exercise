import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import "./editForm.scss";
import { useEffect, useState } from "react";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { crudRecipe } from "../../redux/action/recipe";

const EditForm = () => {
  const { id } = useParams();
  const [recipeList] = useOutletContext();
  const [recipe, setRecipe] = useState(null);

  const [invalidName, setInvalidName] = useState(false);
  const [invalidImage, setInvalidImage] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);
  const [invalidIngredientName, setInvalidIngredientName] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeName = (value) => {
    let cloneRecipe = _.cloneDeep(recipe);
    cloneRecipe.name = value;
    setRecipe(cloneRecipe);
    if (!value) setInvalidName(true);
    else setInvalidName(false);
  };

  const handleChangeImage = (value) => {
    let cloneRecipe = _.cloneDeep(recipe);
    cloneRecipe.image = value;
    setRecipe(cloneRecipe);
    setInvalidImage(false);
  };

  const handleImageError = (e) => {
    e.currentTarget.src = "";
    e.currentTarget.className = "error";
    setInvalidImage(true);
  };

  const handleChangeDescription = (value) => {
    let cloneRecipe = _.cloneDeep(recipe);
    cloneRecipe.description = value;
    setRecipe(cloneRecipe);
    if (!value) setInvalidDescription(true);
    else setInvalidDescription(false);
  };

  const handleIngredientInfo = (value, field, ingredientId) => {
    if (recipe) {
      let cloneRecipe = _.cloneDeep(recipe);
      let ingredient = null;

      cloneRecipe.ingredient.forEach((item) => {
        if (item.id === ingredientId) ingredient = item;
      });

      switch (field) {
        case "name":
          ingredient.name = value;
          if (value) ingredient.valid = true;
          else ingredient.valid = false;
          break;
        case "quantity":
          ingredient.quantity = value;
          break;
        default:
          return;
      }

      cloneRecipe.ingredient.every((item) => {
        if (!item.valid) {
          setInvalidIngredientName(true);
          return false;
        }
        setInvalidIngredientName(false);
        return true;
      });

      setRecipe(cloneRecipe);
    }
  };

  const addNewIngredient = () => {
    if (recipe) {
      let cloneRecipe = _.cloneDeep(recipe);
      let newIngredient = {
        id: uuidv4(),
        name: "",
        quantity: 1,
        valid: false,
      };
      cloneRecipe.ingredient.push(newIngredient);
      setRecipe(cloneRecipe);
      setInvalidIngredientName(true);
    }
  };

  const removeIngredient = (item) => {
    if (recipe) {
      let cloneRecipe = _.cloneDeep(recipe);
      cloneRecipe.ingredient = cloneRecipe.ingredient.filter(
        (ingredient) => ingredient.id !== item.id
      );

      setRecipe(cloneRecipe);
      if (cloneRecipe.ingredient.length === 0) setInvalidIngredientName(true);
    }
  };

  const handleSaveEdit = () => {
    let cloneList = _.cloneDeep(recipeList);
    let cloneRecipe = _.cloneDeep(recipe);

    cloneList.forEach((item) => {
      if (item.id === recipe.id) {
        item.name = cloneRecipe.name;
        item.image = cloneRecipe.image;
        item.description = cloneRecipe.description;
        item.ingredient = cloneRecipe.ingredient;
      }
    });

    dispatch(crudRecipe(cloneList));
    navigate("/recipes");
  };

  useEffect(() => {
    let cloneList = _.cloneDeep(recipeList);

    cloneList.forEach((item) => {
      if (item.id === id) setRecipe(item);
    });
  }, [id, recipeList]);

  return (
    <div className="form-edit-container">
      <Button
        variant="success"
        disabled={
          invalidName ||
          invalidImage ||
          invalidDescription ||
          invalidIngredientName
        }
        onClick={() => handleSaveEdit()}
      >
        Save
      </Button>
      <Button
        variant="danger"
        className="mx-2"
        onClick={() => navigate("/recipes")}
      >
        Cancel
      </Button>

      <Form className="add-form">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={recipe?.name ? recipe.name : ""}
            onChange={(e) => handleChangeName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="imageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            value={recipe?.image ? recipe.image : ""}
            onChange={(e) => handleChangeImage(e.target.value)}
          />
        </Form.Group>

        <Image
          src={recipe?.image ? recipe.image : ""}
          onError={(e) => handleImageError(e)}
          onLoad={(e) => (e.currentTarget.className = "success")}
        />

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={recipe?.description ? recipe.description : ""}
            onChange={(e) => handleChangeDescription(e.target.value)}
          />
        </Form.Group>

        {recipe &&
          recipe?.ingredient &&
          recipe.ingredient.length > 0 &&
          recipe.ingredient.map((item) => {
            return (
              <Row className="ingredient mb-3" key={item.id}>
                <Col className="col-6">
                  <Form.Control
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleIngredientInfo(e.target.value, "name", item.id)
                    }
                  />
                </Col>
                <Col className="col-3">
                  <Form.Control
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleIngredientInfo(e.target.value, "quantity", item.id)
                    }
                  />
                </Col>
                <Col className="col-3 ">
                  <Button
                    variant="danger"
                    className="del-btn"
                    onClick={() => removeIngredient(item)}
                  >
                    X
                  </Button>
                </Col>
              </Row>
            );
          })}
      </Form>

      <hr />
      <Button variant="success" onClick={() => addNewIngredient()}>
        Add Ingredient
      </Button>
    </div>
  );
};

export default EditForm;
