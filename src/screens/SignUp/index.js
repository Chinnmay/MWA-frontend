import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddOperators from "../../components/Admin/AddOperators"
import EditOperators from "../../components/Admin/EditOperators"

const SignUp = () => {
  return (
    <Container fluid style={{ marginTop: "5rem", marginBottom: "1rem" }}>
      <Row>
        <Col md={6}>
          <AddOperators />
        </Col>
        <Col md={6}>
          <EditOperators />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
