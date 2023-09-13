import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./addForm.scss";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { useOutletContext, useNavigate } from "react-router-dom";

const AddForm = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [invalidName, setInvalidName] = useState(true);
  const [invalidImage, setInvalidImage] = useState(true);
  const [invalidDescription, setInvalidDescription] = useState(true);
  const [invalidIngredientName, setInvalidIngredientName] = useState(true);

  const [recipeList, setRecipeList] = useOutletContext();
  const navigate = useNavigate();

  const handleImageError = (e) => {
    e.currentTarget.src = "";
    e.currentTarget.className = "error";
    setInvalidImage(true);
  };

  const addNewIngredient = () => {
    let newIngredient = {
      id: uuidv4(),
      name: "",
      quantity: 1,
      valid: false,
    };
    let newList = [...ingredientList, newIngredient];
    setIngredientList(newList);
    setInvalidIngredientName(true);
  };

  const removeIngredient = (item) => {
    let newList = ingredientList.filter(
      (ingredient) => ingredient.id !== item.id
    );
    setIngredientList(newList);
    if (newList.length === 0) setInvalidIngredientName(true);
  };

  const handleIngredientInfo = (value, field, ingredientId) => {
    let cloneList = _.cloneDeep(ingredientList);
    let ingredient = null;

    cloneList.forEach((item) => {
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

    cloneList.every((item) => {
      if (!item.valid) {
        setInvalidIngredientName(true);
        return false;
      }
      setInvalidIngredientName(false);
      return true;
    });

    setIngredientList(cloneList);
  };

  const handleSave = () => {
    let newRecipe = {
      id: uuidv4(),
      name: name,
      description: description,
      image: imageUrl,
      ingredient: ingredientList,
    };

    setRecipeList([...recipeList, newRecipe]);
    navigate("/recipes");
  };

  return (
    <div className="form-container">
      <Button
        variant="success"
        disabled={
          invalidName ||
          invalidImage ||
          invalidDescription ||
          invalidIngredientName
        }
        onClick={() => handleSave()}
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
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!e.target.value) setInvalidName(true);
              else setInvalidName(false);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="imageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setInvalidImage(false);
            }}
          />
        </Form.Group>

        <Image
          src={imageUrl}
          onError={(e) => handleImageError(e)}
          onLoad={(e) => (e.currentTarget.className = "success")}
        />

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (!e.target.value) setInvalidDescription(true);
              else setInvalidDescription(false);
            }}
          />
        </Form.Group>

        {ingredientList &&
          ingredientList.length > 0 &&
          ingredientList.map((item) => {
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

export default AddForm;
