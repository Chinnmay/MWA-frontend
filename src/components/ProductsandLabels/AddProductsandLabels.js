import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Form, Modal } from "react-bootstrap";
import ModalAlert from "../reusable/ModalAlert";
import ConfirmBox from "../reusable/ConfirmBox";
import axios from "axios";

export default function AddProductsandLabels(props) {
  const styles = {
    saveButton: {
      backgroundColor: "#2d543e",
      color: "white",
      textAlign: "center"
    },
    deleteButton: {
      color: "white",
      textAlign: "center"
    }
  };

  const [val, setVal] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  useEffect(() => {
    if (Object.keys(props.selectedField).length > 0) {
      setVal(props.selectedField);
    } else {
      setVal({});
    }
  }, [props]);

  const handleChange = (e) => {
    var obj = JSON.parse(JSON.stringify(val));
    obj[props.type] = e.target.value;
    setVal(obj);
  };

  const handleSave = () => {
    var endpoint = `${process.env.REACT_APP_API_URL}/api/`;
    if (props.type === "product") endpoint = endpoint + `product/addProduct`;
    else endpoint = endpoint + `label/addLabel`;

    axios.post(endpoint, val).then(
      (res) => {
        if (res.status === 200) {
          console.log("Product/Label added successfully");
          props.reloadProductsandLabels();
          props.setFieldState("", props.type);
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
        if (err.response.data && err.response.data.code === 11000 && err.response.data.name === "MongoError") {
          //1100 is MongoDB error code for duplicate key
          var message = "";
          if (props.type === "product") message = "Product with same name already exists. Please try a different name";
          if (props.type === "label") message = "Label with same name already exists. Please try a different name";
          setShowModal(true);
          setModalMessage(message);
        }
      }
    );
  };

  const handleEdit = () => {
    var endpoint = `${process.env.REACT_APP_API_URL}/api/`;
    if (props.type === "product") endpoint = endpoint + `product/editProduct`;
    else endpoint = endpoint + `label/editLabel`;

    axios.post(endpoint, val).then(
      (res) => {
        if (res.status === 200) {
          console.log("Product/Label edited successfully");
          props.reloadProductsandLabels();
          props.setFieldState("", props.type);
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
        if (err.response.data && err.response.data.code === 11000 && err.response.data.name === "MongoError") {
          //1100 is MongoDB error code for duplicate key
          var message = "";
          if (props.type === "product") message = "Product with same name already exists. Please try a different name";
          if (props.type === "label") message = "Label with same name already exists. Please try a different name";
          setShowModal(true);
          setModalMessage(message);
        }
      }
    );
  };

  const handleDelete = () => {
    var endpoint = `${process.env.REACT_APP_API_URL}/api/`;
    if (props.type === "product") endpoint = endpoint + `product/deleteProduct`;
    else endpoint = endpoint + `label/deleteLabel`;

    axios.post(endpoint, val).then(
      (res) => {
        if (res.status === 200) {
          console.log("Product/Label deleted successfully");
          props.reloadProductsandLabels();
          props.setFieldState("", props.type);
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return props.fieldState === "add" ? (
    <Row>
      <Col xs={9} md={10}>
        <Form.Control
          type="text"
          placeholder={`Enter ${props.type}`}
          onChange={(e) => handleChange(e)}
          value={val[props.type] ? val[props.type] : ""}
        />
      </Col>
      <Col xs={1}>
        <Button style={styles.saveButton} onClick={handleSave}>
          Save
        </Button>
      </Col>
      {showModal && <ModalAlert size="lg" variant="danger" message={modalMessage} resetCallback={setShowModal} />}
    </Row>
  ) : (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <Form.Control
            type="text"
            placeholder={`Enter ${props.type}`}
            onChange={(e) => handleChange(e)}
            value={val[props.type] ? val[props.type] : ""}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xs={{ offset: 3, span: 1 }} md={{ offset: 4, span: 1 }}>
          <Button style={styles.saveButton} onClick={handleEdit}>
            Edit
          </Button>
        </Col>
        <Col xs={{ offset: 2, span: 1 }} md={{ offset: 1, span: 1 }}>
          <Button variant="danger" style={styles.deleteButton} onClick={() => setShowConfirmBox(true)}>
            Delete
          </Button>
        </Col>
        {showModal && <ModalAlert size="lg" variant="danger" message={modalMessage} resetCallback={setShowModal} />}
      </Row>
      {showConfirmBox && (
        <Row>
          <ConfirmBox
            resetCallback={setShowConfirmBox}
            heading="Confirm Delete"
            message={`Are you sure you want to delete this ${props.type}?`}
            confirmAction={handleDelete}
          />
        </Row>
      )}
    </React.Fragment>
  );
}
