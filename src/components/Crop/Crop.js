import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Container, Button, Row, Col, Form, Card, Badge, ListGroup, Alert, Carousel } from "react-bootstrap";
import axios from "axios";
import CropModal from "./CropModal";
import CropDetails from "./CropDetails";
import { useHistory } from "react-router-dom";
import image from "../../assets/images/grassBackground.JPG";
import ModalAlert from "../reusable/ModalAlert";
import LoadingSpinner from "../reusable/LoadingSpinner";
export default function Crop() {
  const history = useHistory();
  const styles = {
    addButton: {
      marginLeft: "10%",
      marginRight: "10%",
      backgroundColor: "#2d543e",
      fontSize: "large"
    },
    container: {
      marginTop: "5rem"
    },
    scrollMenu: {
      alignSelf: "center",
      //overflowX: "auto",
      //flexWrap: "nowrap",
      marginTop: "5%",
      overflowY: "scroll",
      maxHeight: "16rem"
    },
    cropCard: {
      width: "10rem",
      height: "5rem",
      backgroundColor: "transparent",
      backgroundImage: `url(${image})`,
      border: "2px solid #2d543e",
      color: "black",
      backgroundSize: "cover",
      backgroundPosition: "center",
      marginBottom: "5%",
      textOverflow: "ellipsis",
      overflow: "hidden"
    }
  };

  const [crops, setCrops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [selectedCrop, setSelectedCrop] = useState({});
  const [showCropDetails, setShowCropDetails] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [fetching, setFetching] = useState(true);

  function onCropSubmit(sendCrop) {
    console.log(sendCrop);
    if (action === "add") {
      //axios add crop call
      axios.post(`${process.env.REACT_APP_API_URL}/api/crop/addEditCrop`, sendCrop).then(
        (res) => {
          if (res.status === 200) {
            console.log("Crop added successfully");
            setShowModal(false);
            setShowAlert(true);
          } else {
            console.log(res);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (action === "edit") {
      //axios edit crop call
      axios.post(`${process.env.REACT_APP_API_URL}/api/crop/addEditCrop`, sendCrop).then(
        (res) => {
          if (res.status === 200) {
            console.log("Crop edited successfully");
            setShowModal(false);
            setShowCropDetails(false);
            setShowAlert(true);
          } else {
            console.log(res);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  useEffect(() => {
    console.log("Component Rerendered");
  }, [selectedCrop, fetching]);
  useEffect(() => {
    console.log("Component Rerendered");
    setFetching(true);
    //axios call to get all crops
    axios.get(`${process.env.REACT_APP_API_URL}/api/crop/allCrops`).then(
      (res) => {
        if (res.status === 200) {
          setFetching(false);
          setCrops(res.data);
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, [showModal]);

  return fetching ? (
    <div style={{ marginTop: "5rem" }}>
      <LoadingSpinner />
    </div>
  ) : (
    <Container style={styles.container}>
      <Row className="mb-4">
        <Button
          style={styles.addButton}
          onClick={() => {
            setAction("add");
            setShowModal(true);
          }}
          block
        >
          Add New Crop
        </Button>
      </Row>
      <Row style={styles.scrollMenu}>
        {crops.map((crop) => (
          <Col style={{ textAlign: "center" }}>
            <Button
              style={styles.cropCard}
              onClick={() => {
                setSelectedCrop(crop);
                setShowCropDetails(true);
              }}
            >
              {crop.crop}
            </Button>
          </Col>
        ))}
      </Row>
      {showCropDetails && <CropDetails crop={selectedCrop} openEditModal={setShowModal} setAction={setAction} />}
      {showModal && (
        <CropModal action={action} crop={selectedCrop} resetCallback={setShowModal} onCropSubmit={onCropSubmit} />
      )}
      {showAlert &&
        (action === "add" ? (
          <ModalAlert size="lg" variant="success" message={"Crop added successfully"} resetCallback={setShowAlert} />
        ) : (
          <ModalAlert size="lg" variant="success" message={"Crop edited successfully"} resetCallback={setShowAlert} />
        ))}
    </Container>
  );
}
