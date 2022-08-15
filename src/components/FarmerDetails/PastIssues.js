import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Form, Card, Badge, ListGroup, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import colors from "../../config/colors";
import { styles } from "./styles";
import getPastIssues from "./getPastIssues";
import LoadingSpinner from "../reusable/LoadingSpinner";

const PastIssues = (props) => {
  const [pastIssues, setPastIssues] = useState([]);
  const [fetching, setFetching] = useState(true);

  const loadPastIssues = async () => {
    if (props) {
      if (props.farmerID) {
        const pastResponse = await getPastIssues(props.farmerID);
        if (pastResponse.status == 200) {
          setFetching(false);
          setPastIssues(pastResponse.data.issues);
          console.log(pastResponse);
        } else {
          console.log(pastResponse);
        }
      } else {
        console.log("Some Error Occurred, Please Try Again");
      }
    } else {
      console.log("Some Error Occurred, Please Try Again");
    }
  };

  useEffect(() => {
    setFetching(true);
    loadPastIssues();
  }, []);

  return fetching ? (
    <LoadingSpinner />
  ) : (
    <Card>
      <Card.Header style={styles.displaySearchContainerCardHeader}>
        Past Issues
        <Badge pill variant="light" style={styles.badgePill}>
          {pastIssues.length ? pastIssues.length : 0}
        </Badge>
      </Card.Header>
      <Card.Body style={styles.searchCardBody}>
        {pastIssues.length == 0 ? (
          <Alert variant="danger" className="m-0" style={{ textAlign: "center" }}>
            <b>No Past Issues Found</b>
          </Alert>
        ) : (
          pastIssues &&
          pastIssues.map((val) => (
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
  );
};

export default PastIssues;
