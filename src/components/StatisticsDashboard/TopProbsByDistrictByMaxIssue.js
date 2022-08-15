import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Dropdown, ListGroup } from "react-bootstrap";

export default function TopProbsByDistrictByMaxIssue(props) {
  const styles = {
    dropdownButton: { backgroundColor: "#2d543e", width: "100%" },
    listItem: { paddingTop: "2%", paddingBottom: "2%" }
  };
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  return (
    <Container className="m-0 p-0">
      <Row className="mt-5" noGutters={true}>
        <Col>
          <h5>Top 3 problems identified for top 5 districts with maximum issues</h5>
        </Col>
      </Row>
      <Row className="mt-2" noGutters={true} style={{ alignItems: "flex-start" }}>
        <Col md={5} className="mb-3">
          <Dropdown>
            <Dropdown.Toggle style={styles.dropdownButton}>
              {selectedState.length > 0 ? selectedState : "Select State"}
            </Dropdown.Toggle>
            {Array.from(
              new Set(
                props.data.map((obj) => {
                  return obj.state;
                })
              )
            ).length > 0 && (
              <Dropdown.Menu>
                {Array.from(
                  new Set(
                    props.data.map((obj) => {
                      return obj.state;
                    })
                  )
                ).map((state, idx) => (
                  <Dropdown.Item
                    onSelect={() => {
                      setSelectedState(state);
                      setSelectedDistrict("");
                    }}
                  >
                    {state}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            )}
          </Dropdown>
        </Col>
        <Col md={{ span: 5, offset: 2 }} className="mb-3">
          {selectedState.length > 0 && (
            <Dropdown>
              <Dropdown.Toggle style={styles.dropdownButton}>
                {selectedDistrict.length > 0 ? selectedDistrict : "Select District"}
              </Dropdown.Toggle>
              {Array.from(
                new Set(
                  props.data
                    .filter((obj) => obj.state === selectedState)
                    .map((o) => {
                      return o.district;
                    })
                )
              ).length > 0 && (
                <Dropdown.Menu>
                  {Array.from(
                    new Set(
                      props.data
                        .filter((obj) => obj.state === selectedState)
                        .map((o) => {
                          return o.district;
                        })
                    )
                  ).map((district, idx) => (
                    <Dropdown.Item
                      onSelect={() => {
                        setSelectedDistrict(district);
                      }}
                    >
                      {district}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              )}
            </Dropdown>
          )}
        </Col>
        <Col className="mb-3">
          {selectedState.length > 0 && selectedDistrict.length > 0 && (
            <ListGroup>
              {props.data.filter((obj) => obj.state === selectedState && obj.district === selectedDistrict)[0]
                .topProblemsForDistrict.length > 0 &&
                props.data
                  .filter((obj) => obj.state === selectedState && obj.district === selectedDistrict)[0]
                  .topProblemsForDistrict.map((prob) => (
                    <ListGroup.Item style={styles.listItem}>{prob}</ListGroup.Item>
                  ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}
