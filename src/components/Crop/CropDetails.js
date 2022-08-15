import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Modal, Tabs, Tab, Form, Container, Button, Row, Col, Dropdown, ListGroup, Card } from "react-bootstrap";
import axios from "axios";
export default function CropDetails(props) {
  const styles = {
    container: {
      marginTop: "10%",
      paddingBottom: "3%"
    },
    bodyContainer: {
      maxHeight: "50rem",
      overflowY: "auto",
      fontSize: "1rem",
      fontWeight: "normal"
    },
    categorySelect: {
      backgroundColor: "transparent",
      border: "2px solid #2d543e",
      color: "black",
      width: "100%"
    },
    displaySearchContainerCardHeader: {
      backgroundColor: "#2d543e",
      color: "white",
      textAlign: "center",
      padding: "0.5rem"
    },
    editButton: {
      marginBottom: "0.3rem"
    }
  };

  const [viewCategory, setViewCategory] = useState("");
  useEffect(() => {
    setViewCategory("");
  }, [props]);

  return (
    <Card style={styles.container}>
      <Card.Header style={styles.displaySearchContainerCardHeader}>
        <Container>
          <Row style={{ alignItems: "center" }}>
            <Col xs="9" md="11">
              <h4 style={{ marginLeft: "10%", marginBottom: "0px", fontWeight: "normal" }}>{`Crop Details`}</h4>
            </Col>
            <Col xs="1">
              <Button
                className="btn-light"
                style={styles.editButton}
                onClick={() => {
                  props.setAction("edit");
                  props.openEditModal(true);
                }}
              >
                Edit
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Header>
      <Card.Body style={styles.bodyContainer}>
        <Container>
          <Row className="mb-3">
            <Col xs={5}>
              <h5>{`Crop Name :-`}</h5>
            </Col>
            <Col xs={7}>
              <p>{props.crop.crop}</p>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={5}>
              <h5>{`Categories :-`}</h5>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle style={styles.categorySelect}>
                  {viewCategory.length > 0 ? viewCategory : "Select Category"}
                </Dropdown.Toggle>
                {props.crop.categories && (
                  <Dropdown.Menu style={{ width: "100%" }}>
                    {props.crop.categories.map((category, idx) => (
                      <Dropdown.Item
                        style={{ width: "100%" }}
                        onSelect={() => {
                          setViewCategory(category.category);
                        }}
                      >
                        {category.category}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                )}
              </Dropdown>
            </Col>
          </Row>
          {viewCategory.length > 0 && (
            <Row>
              <Col md={5}>
                <h5>{`Problems :-`}</h5>
              </Col>
              <Col>
                <ListGroup>
                  {props.crop.categories.filter((cat) => cat.category === viewCategory)[0] &&
                    props.crop.categories.filter((cat) => cat.category === viewCategory)[0].problems &&
                    props.crop.categories
                      .filter((cat) => cat.category === viewCategory)[0]
                      .problems.map((prob) => <ListGroup.Item>{prob.problemText}</ListGroup.Item>)}
                </ListGroup>
              </Col>
            </Row>
          )}
        </Container>
      </Card.Body>
    </Card>
  );
}
