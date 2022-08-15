import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Modal, Tabs, Tab, Form, Container, Button, Row, Col, Dropdown } from "react-bootstrap";
import axios from "axios";
import "../Crop/cropmodal.css";
export default function CropModal(props) {
  const styles = {
    tabContainer: { marginTop: "5%", marginBottom: "3%" },
    addButton: { backgroundColor: "#2d543e" },
    footer: { justifyContent: "center" },
    categoryRow: { marginTop: "2%" },
    modalHeader: { backgroundColor: "#2d543e", color: "white" },
    modalTitle: { fontWeight: "inherit" },
    problemRow: { marginTop: "2%" },
    addProblemButton: { backgroundColor: "#2d543e", marginTop: "5%" }
  };

  const [crop, setCrop] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (props.crop && props.action != "add") {
      setCrop(props.crop);
    }
  }, []);
  useEffect(() => {
    console.log(crop);
  }, [crop, selectedCategory]);

  return (
    <Container>
      <Row>
        <Col>
          <Modal size="lg" show={true} onHide={() => props.resetCallback(false)}>
            <Modal.Header style={styles.modalHeader}>
              <Modal.Title style={styles.modalTitle}>{props.action === "add" ? "Add Crop" : "Edit Crop"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tabs
                fill
                defaultActiveKey="Crop Name"
                onSelect={(key) => {
                  if (key === "Categories") {
                    setSelectedCategory("");
                  }
                }}
              >
                <Tab eventKey="Crop Name" title={"Crop Name"}>
                  <Container style={styles.tabContainer}>
                    <Form>
                      {props.action === "add" ? (
                        <Form.Control
                          value={crop.crop}
                          placeholder="Enter Crop Name"
                          type="text"
                          onChange={(e) => {
                            var t = JSON.parse(JSON.stringify(crop));
                            t["crop"] = e.target.value;
                            setCrop(t);
                          }}
                        />
                      ) : (
                        <Form.Control
                          value={crop.crop}
                          placeholder="Enter Crop Name"
                          type="text"
                          onChange={(e) => {
                            var t = JSON.parse(JSON.stringify(crop));
                            t["crop"] = e.target.value;
                            setCrop(t);
                          }}
                        />
                      )}
                    </Form>
                  </Container>
                </Tab>
                <Tab eventKey="Categories" title={"Categories"}>
                  <Container style={styles.tabContainer}>
                    <Row>
                      <Col>
                        <Button
                          size="sm"
                          style={styles.addButton}
                          onClick={() => {
                            var t = JSON.parse(JSON.stringify(crop));
                            if (!t.categories) t["categories"] = [{ category: "", problems: [] }];
                            else t["categories"].push({ category: "", problems: [] });
                            setCrop(t);
                          }}
                        >
                          Add +
                        </Button>
                      </Col>
                    </Row>
                    {crop.categories &&
                      crop.categories.map((category, idx) => (
                        <Row style={styles.categoryRow}>
                          <Col>
                            <Form.Control
                              onChange={(e) => {
                                var t = JSON.parse(JSON.stringify(crop));
                                t.categories[idx].category = e.target.value;
                                setCrop(t);
                              }}
                              value={category.category}
                              placeholder="Enter Category"
                              type="text"
                            />
                          </Col>
                        </Row>
                      ))}
                  </Container>
                </Tab>
                <Tab eventKey="Problems" title={"Problems"}>
                  <Container style={styles.tabContainer}>
                    <Row>
                      <Col>
                        <Dropdown>
                          <Dropdown.Toggle style={styles.addButton}>
                            {selectedCategory.length > 0 ? selectedCategory : "Select Category to add Problem"}
                          </Dropdown.Toggle>
                          {crop.categories && (
                            <Dropdown.Menu>
                              {crop.categories.map((category, idx) => (
                                <Dropdown.Item
                                  onSelect={() => {
                                    setSelectedCategory(category.category);
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
                    {selectedCategory && selectedCategory.length > 0 && (
                      <Container>
                        <Row>
                          <Col>
                            <Button
                              size="sm"
                              style={styles.addProblemButton}
                              onClick={() => {
                                var t = JSON.parse(JSON.stringify(crop));
                                t["categories"]
                                  .filter((category) => category.category === selectedCategory)[0]
                                  .problems.push({ problemText: "" });
                                setCrop(t);
                              }}
                            >
                              Add +
                            </Button>
                          </Col>
                        </Row>
                        {crop["categories"].filter((category) => category.category === selectedCategory)[0].problems &&
                          crop["categories"]
                            .filter((category) => category.category === selectedCategory)[0]
                            .problems.map((problem, idx) => (
                              <Row style={styles.problemRow}>
                                <Col>
                                  <Form.Control
                                    onChange={(e) => {
                                      var t = JSON.parse(JSON.stringify(crop));
                                      t["categories"].filter(
                                        (category) => category.category === selectedCategory
                                      )[0].problems[idx].problemText = e.target.value;
                                      setCrop(t);
                                    }}
                                    value={problem.problemText}
                                    placeholder="Enter Problem"
                                    type="text"
                                  />
                                </Col>
                              </Row>
                            ))}
                      </Container>
                    )}
                  </Container>
                </Tab>
              </Tabs>
            </Modal.Body>
            <Modal.Footer style={styles.footer}>
              <Button
                style={styles.addButton}
                type="submit"
                onClick={() => {
                  props.onCropSubmit(crop);
                }}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}
