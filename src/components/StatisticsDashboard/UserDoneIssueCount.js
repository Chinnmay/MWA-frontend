import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Dropdown, Form } from "react-bootstrap";

export default function UserDoneIssueCount(props) {
  const styles = {
    dropdownButton: { backgroundColor: "#2d543e", width: "100%" },
    listItem: { paddingTop: "2%", paddingBottom: "2%" },
    dropdownMenu: { maxHeight: "20rem", overflowY: "auto" }
  };
  const [selectedOperator, setSelectedOperator] = useState("");
  return (
    <Container className="m-0 p-0">
      <Row className="mt-5" noGutters={true}>
        <Col>
          <h5>Number of Completed Issues by operator</h5>
        </Col>
      </Row>
      <Row className="mt-2" noGutters={true} style={{ alignItems: "center" }}>
        <Col md={9} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle style={styles.dropdownButton}>
              {selectedOperator.length > 0 ? selectedOperator : "Select Operator Name"}
            </Dropdown.Toggle>
            {Object.keys(props.data).length > 0 && (
              <Dropdown.Menu style={styles.dropdownMenu}>
                {Object.keys(props.data).map((operator, idx) => (
                  <Dropdown.Item
                    onSelect={() => {
                      setSelectedOperator(operator);
                    }}
                  >
                    {operator}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            )}
          </Dropdown>
        </Col>

        <Col md={{ span: 2, offset: 1 }} className="mb-3">
          {selectedOperator && (
            <Form.Control
              className="text-center bg-transparent f"
              disabled={true}
              value={props.data[selectedOperator]}
              style={{ fontSize: "x-large", fontWeight: "500" }}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}
