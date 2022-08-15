import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import PendingIssues from "../../components/IssueHomePage/PendingIssues";
import SearchIssue from "../../components/IssueHomePage/SearchIssue";

const Issue = () => {
  const isAdmin = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user")).role
        ? JSON.parse(localStorage.getItem("user")).role == "admin"
          ? true
          : false
        : false
      : false
    : false;
  return (
    <Container fluid style={{ marginTop: "5rem", marginBottom: "1rem" }}>
      <Row>
        <Col md={7}>{isAdmin ? <StatisticsDashboard /> : <PendingIssues />}</Col>
        <Col md={5}>
          <SearchIssue />
        </Col>
      </Row>
    </Container>
  );
};

export default Issue;
