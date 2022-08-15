import React from "react";
import { Spinner, Row } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <Row noGutters={true} style={{ justifyContent: "center" }}>
      <Spinner animation="border" variant="danger"></Spinner>
    </Row>
  );
}
