import "./shoppingList.scss";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";

const ShoppingList = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [invalidName, setInvalidName] = useState(true);
  const [invalidAmount, setInvalidAmount] = useState(true);
  const [ingredientList, setIngredientList] = useState([]);
  const [isAdding, setIsAdding] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [show, setShow] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location?.state?.list) setIngredientList(location.state.list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleClear = () => {
    setName("");
    setAmount(0);
    setIsAdding(true);
    setInvalidAmount(true);
    setInvalidName(true);
  };

  const handleAdd = () => {
    let newIngredient = {
      id: uuidv4(),
      name: name,
      quantity: amount,
    };

    setIngredientList([...ingredientList, newIngredient]);
    handleClear();
  };

  const handleClickIngredient = (item) => {
    setName(item.name);
    setAmount(item.quantity);
    setSelectedItem(item);
    setIsAdding(false);
    setInvalidAmount(false);
    setInvalidName(false);
  };

  const handleDelete = () => {
    let newList = ingredientList.filter((item) => item.id !== selectedItem.id);
    setIngredientList(newList);
    handleClose();
    handleClear();
  };

  const handleUpdate = () => {
    let cloneList = _.cloneDeep(ingredientList);

    cloneList.forEach((item) => {
      if (item.id === selectedItem.id) {
        item.name = name;
        item.quantity = amount;
      }
    });

    setIngredientList(cloneList);
    handleClear();
  };

  return (
    <div className="shopping-container">
      <Form className="ingredient-form">
        <Row className="mb-3">
          <Col className="col-4">
            <Form.Label>
              <b>Name</b>
            </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!e.target.value) setInvalidName(true);
                else setInvalidName(false);
              }}
            />
          </Col>
          <Col className="col-2">
            <Form.Label>
              <b>Amount</b>
            </Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (!e.target.value) setInvalidAmount(true);
                else setInvalidAmount(false);
              }}
            />
          </Col>
        </Row>
        {isAdding ? (
          <Button
            variant="success"
            disabled={invalidName || invalidAmount}
            onClick={() => handleAdd()}
          >
            Add
          </Button>
        ) : (
          <>
            <Button
              variant="warning"
              disabled={invalidName || invalidAmount}
              onClick={() => handleUpdate()}
            >
              Update
            </Button>
            <Button
              variant="danger"
              className="mx-2"
              onClick={() => handleShow()}
            >
              Delete
            </Button>
          </>
        )}

        <Button
          variant="primary"
          className="mx-2"
          onClick={() => handleClear()}
        >
          Clear
        </Button>
      </Form>

      <hr />

      <ListGroup className="ingredient-list">
        {ingredientList &&
          ingredientList.length > 0 &&
          ingredientList.map((item) => {
            return (
              <ListGroup.Item
                className="ingredient"
                key={item.id}
                onClick={() => handleClickIngredient(item)}
              >{`${item.name} (${item.quantity})`}</ListGroup.Item>
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
            Are you sure to delete this ingredient?
          </Col>

          <Row className="mb-3">
            <Col className="col-3">
              <b>Name: </b>
            </Col>{" "}
            <Col>{selectedItem?.name ? selectedItem.name : ""}</Col>
          </Row>
          <Row className="mb-3">
            <Col className="col-3">
              <b>Amount:</b>
            </Col>
            <Col> {selectedItem?.quantity ? selectedItem.quantity : ""}</Col>
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

export default ShoppingList;
