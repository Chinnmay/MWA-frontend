import React, { useEffect, useState } from "react";
import getPendingIssues from "./getPendingIssues";
import { Container, Button, Row, Col, Form, Card, Badge, ListGroup, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import colors from "../../config/colors";
import { styles } from "./styles";
import LoadingSpinner from "../reusable/LoadingSpinner";

const PendingIssues = () => {
  const [userId, setUserId] = useState(null);
  const [pendingIssues, setPendingIssues] = useState([]);
  const [fetching, setFetching] = useState(true);

  const loadPendingIssues = async () => {
    const storedUserObject = await JSON.parse(localStorage.getItem("user"));
    if (storedUserObject) {
      if (storedUserObject._id) {
        setUserId(storedUserObject._id);
        const pendingResponse = await getPendingIssues(storedUserObject._id);
        if (pendingResponse.status == 200) {
          setPendingIssues(pendingResponse.data.issues);
          console.log(pendingResponse);
          setFetching(false);
        } else {
          console.log(pendingResponse);
        }
      } else {
        console.log("User Session Expired, Please Login again.");
      }
    } else {
      console.log("User Session Expired, Please Login again.");
    }
  };

  useEffect(() => {
    setFetching(true);
    loadPendingIssues();
  }, []);
  useEffect(() => {}, [fetching]);

  return (
    <>
      {fetching ? (
        <LoadingSpinner />
      ) : (
        <Card>
          <Card.Header style={styles.displaySearchContainerCardHeader}>
            Pending Issues
            <Badge pill variant="light" style={styles.badgePill}>
              {pendingIssues.length ? pendingIssues.length : 0}
            </Badge>
          </Card.Header>
          <Card.Body style={styles.searchCardBody}>
            {pendingIssues.length == 0 ? (
              <Alert variant="danger" className="m-0" style={{ textAlign: "center" }}>
                <b>No Pending Issues Found</b>
              </Alert>
            ) : (
              pendingIssues &&
              pendingIssues.map((val) => (
                <Link to={`/viewIssue/${val.issueCode}`} style={{ textDecoration: "none", color: "black" }}>
                  <Row className="justify-content-center" style={styles.searchRow}>
                    <Col md={3} className="text-truncate">
                      {val.issueCode}
                    </Col>
                    <Col md={6} className="text-truncate">
                      {val.title}
                    </Col>
                    <Col md={3} xs={6}>
                      <div
                        className="text-truncate"
                        style={{
                          ...styles.status,
                          backgroundColor:
                            val.status == "New"
                              ? colors.newColor
                              : val.status == "In Progress"
                              ? colors.inprogressColor
                              : val.status == "SolutionProvided"
                              ? colors.solvedColor
                              : val.status == "In Follow Up"
                              ? colors.infollowColor
                              : val.status == "Done"
                              ? colors.doneColor
                              : val.status == "On Hold"
                              ? colors.onholdColor
                              : val.status == "Rejected"
                              ? colors.rejectedColor
                              : colors.yellow
                        }}
                      >
                        {val.status}
                      </div>
                    </Col>
                  </Row>
                </Link>
              ))
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default PendingIssues;
