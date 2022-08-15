import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Dropdown, ListGroup } from "react-bootstrap";

export default function TopProbsByMaxIssue(props) {
  const styles = {
    dropdownButton: { backgroundColor: "#2d543e", width: "100%" },
    listItem: { paddingTop: "2%", paddingBottom: "2%" }
  };
  const [selectedCrop, setSelectedCrop] = useState("");
  return (
    <Container className="m-0 p-0">
      <Row className="mt-5" noGutters={true}>
        <Col>
          <h5>Top 3 problems identified for top 5 crops with maximum issues</h5>
        </Col>
      </Row>
      <Row className="mt-2" noGutters={true} style={{ alignItems: "flex-start" }}>
        <Col md={4} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle style={styles.dropdownButton}>
              {selectedCrop.length > 0 ? selectedCrop : "Select Crop"}
            </Dropdown.Toggle>
            {Object.keys(props.data).length > 0 && (
              <Dropdown.Menu>
                {Object.keys(props.data).map((crop, idx) => (
                  <Dropdown.Item
                    onSelect={() => {
                      setSelectedCrop(crop);
                    }}
                  >
                    {crop}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            )}
          </Dropdown>
        </Col>
        <Col md={{ span: 7, offset: 1 }} className="mb-3">
          <ListGroup>
            {selectedCrop.length > 0 &&
              props.data[selectedCrop].length > 0 &&
              props.data[selectedCrop].map((prob) => <ListGroup.Item style={styles.listItem}>{prob}</ListGroup.Item>)}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
