import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Form, Card, Badge } from "react-bootstrap";
import axios from "axios";

export default function ViewProductsandLabels(props) {
  const styles = {
    containerCardHeader: {
      backgroundColor: "#2d543e",
      color: "white",
      textAlign: "center",
      padding: "2%"
    },
    pill: {
      border: "1px solid #2d543e",
      marginLeft: "1%",
      marginRight: "1%",
      marginBottom: "3%",
      backgroundColor: "transparent",
      color: "black"
    }
  };

  return (
    <Row>
      <Col>
        <Card className="mt-5">
          <Card.Header style={styles.containerCardHeader}>
            <h5 className="m-0 p-0">{"Available " + (props.type === "product" ? "Products" : "Labels")}</h5>
          </Card.Header>
          <Card.Body style={{ maxHeight: "20rem", overflowY: "scroll" }}>
            <Row noGutters={true}>
              <Col>
                {props.values.map((eachVal) => (
                  <Button
                    style={styles.pill}
                    onClick={() => {
                      props.setSelectedField(eachVal);
                      props.setFieldState("edit", props.type);
                    }}
                  >
                    {props.type === "product" ? eachVal.product : eachVal.label}
                  </Button>
                ))}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
