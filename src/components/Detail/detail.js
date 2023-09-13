import { useEffect, useState } from "react";
import "./detail.scss";
import { useParams } from "react-router-dom";
import { useOutletContext, useNavigate } from "react-router-dom";
import _ from "lodash";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { crudRecipe } from "../../redux/action/recipe";

const Detail = () => {
  const { id } = useParams();
  const [recipeList] = useOutletContext();
  const [recipe, setRecipe] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/recipes");
  };
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    let newList = recipeList.filter((item) => item.id !== id);

    dispatch(crudRecipe(newList));
    navigate("/recipes");
  };

  useEffect(() => {
    let cloneList = _.cloneDeep(recipeList);

    cloneList.forEach((item) => {
      if (item.id === id) setRecipe(item);
    });
  }, [id, recipeList]);

  const handleChangeSelect = (value) => {
    switch (value) {
      case "list":
        navigate("/shopping-list", {
          state: { list: recipe.ingredient },
        });
        break;
      case "edit":
        navigate(`/recipes/edit-recipe/${recipe.id}`);
        break;
      case "delete":
        handleShow();
        break;
      default:
        return;
    }
  };

  return (
    <div className="detail-container">
      <Image src={recipe?.image ? recipe.image : ""} />
      <div className="name">{recipe?.name}</div>
      <Form.Select
        aria-label="Default select example"
        className="manage-recipe"
        onChange={(e) => handleChangeSelect(e.target.value)}
      >
        <option hidden>Manage Recipe</option>
        <option value="list">To Shopping List</option>
        <option value="edit">Edit Recipe</option>
        <option value="delete">Delete Recipe</option>
      </Form.Select>

      <div className="description">{recipe?.description}</div>

      <ListGroup>
        {recipe &&
          recipe?.ingredient &&
          recipe?.ingredient.length > 0 &&
          recipe.ingredient.map((item) => {
            return (
              <ListGroup.Item key={item.id}>
                {item.name} - {item.quantity}
              </ListGroup.Item>
            );
          })}
      </ListGroup>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col className="mb-3" style={{ fontSize: "1.3em" }}>
            Are you sure to delete this recipe?
          </Col>

          <Row className="mb-3">
            <Col className="col-3">
              <b>Name: </b>
            </Col>{" "}
            <Col>{recipe?.name ? recipe.name : ""}</Col>
          </Row>
          <Row className="mb-4">
            <Col className="col-3">
              <b>Description:</b>
            </Col>
            <Col> {recipe?.description ? recipe.description : ""}</Col>
          </Row>
          <Row style={{ justifyContent: "center" }}>
            <Image
              src={recipe?.image ? recipe.image : ""}
              style={{ width: "70%" }}
            />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Detail;
