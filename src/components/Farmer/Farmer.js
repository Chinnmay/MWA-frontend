import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Container, Button, Row, Col, Form, Card, Badge, ListGroup, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import SearchFarmerForm from "./SearchFarmerForm";
import LoadingSpinner from "../reusable/LoadingSpinner";
export default function Farmer() {
  const history = useHistory();
  const styles = {
    container: {
      marginTop: "5rem"
    },
    addButton: {
      marginLeft: "10%",
      marginRight: "10%",
      backgroundColor: "#2d543e"
    },
    displaySearchContainerCard: {
      marginLeft: "5%",
      marginRight: "5%"
    },
    displaySearchContainerCardHeader: {
      backgroundColor: "#2d543e",
      color: "white",
      textAlign: "center"
    },
    badgePill: {
      marginLeft: "2%"
    },
    searchCardBody: {
      maxHeight: "15rem",
      overflowY: "auto"
    },
    searchRow: {
      border: "2px solid #2d543e",
      marginBottom: "1%",
      textAlign: "center"
    }
  };
  const [farmers, setFarmers] = useState([]);
  const [firstCall, setFirstCall] = useState(true);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {}, [farmers, firstCall, fetching]);

  const submitSearch = (values) => {
    Object.keys(values).map((k) => {
      if (values[k] == "") delete values[k];
    });
    if (values.district && values.district.value) {
      values["district"] = values.district.value;
    }
    if (values.district && values.state.value) {
      values["state"] = values.state.value;
    }
    axios.post(`${process.env.REACT_APP_API_URL}/api/farmer/searchFarmer`, values).then(
      (res) => {
        setFetching(false);
        setFarmers(res.data);
        setFirstCall(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <>
      <Container style={styles.container}>
        <Row className="mb-3">
          <Button variant="primary" style={styles.addButton} href="/addFarmer" block>
            Add New Farmer
          </Button>
        </Row>
        <Row className="mb-4">
          <SearchFarmerForm submitSearch={submitSearch} />
        </Row>
        {fetching && !firstCall ? (
          <LoadingSpinner />
        ) : (
          !firstCall && (
            <Row>
              <Col>
                <Card style={styles.displaySearchContainerCard}>
                  <Card.Header style={styles.displaySearchContainerCardHeader}>
                    Farmers Search Results List
                    <Badge pill variant="light" style={styles.badgePill}>
                      {farmers.length ? farmers.length : 0}
                    </Badge>
                  </Card.Header>
                  <Card.Body style={styles.searchCardBody}>
                    {(farmers.length === 0 || farmers.message === "No farmer Found") && !firstCall ? (
                      <Alert variant="danger" className="m-0" style={{ textAlign: "center" }}>
                        Farmer search result <b>Not Found</b>. Please click on <b>Add</b> button
                      </Alert>
                    ) : (
                      farmers &&
                      farmers.message !== "No farmer Found" &&
                      farmers.map((val) => (
                        <Link
                          to={{ pathname: `/viewFarmer/${val.mobileNumber}`, state: { farmerID: val._id } }}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <Row style={styles.searchRow}>
                            <Col md={3}>{val.fullName}</Col>
                            <Col md={3}>{val.mobileNumber}</Col>
                            <Col md={3}>{val.district}</Col>
                            <Col md={3}>{val.state}</Col>
                          </Row>
                        </Link>
                      ))
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )
        )}
      </Container>
    </>
  );
}
