import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Form, Card, Badge, ListGroup, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import colors from "../../config/colors";
import { styles } from "./styles";
import getCurrentIssues from "./getCurrentIssues";
import LoadingSpinner from "../reusable/LoadingSpinner";

const CurrentIssues = (props) => {
  const [currentIssues, setCurrentIssues] = useState([]);
  const [fetching, setFetching] = useState(true);

  const loadCurrentIssues = async () => {
    if (props) {
      if (props.farmerID) {
        const currentResponse = await getCurrentIssues(props.farmerID);
        if (currentResponse.status == 200) {
          setFetching(false);
          setCurrentIssues(currentResponse.data.issues);
          console.log(currentResponse);
        } else {
          console.log(currentResponse);
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
    loadCurrentIssues();
  }, []);

  return fetching ? (
    <LoadingSpinner />
  ) : (
    <Card>
      <Card.Header style={styles.displaySearchContainerCardHeader}>
        Current Issues
        <Badge pill variant="light" style={styles.badgePill}>
          {currentIssues.length ? currentIssues.length : 0}
        </Badge>
      </Card.Header>
      <Card.Body style={styles.searchCardBody}>
        {currentIssues.length == 0 ? (
          <Alert variant="danger" className="m-0" style={{ textAlign: "center" }}>
            <b>No Current Issues Found</b>
          </Alert>
        ) : (
          currentIssues &&
          currentIssues.map((val) => (
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

export default CurrentIssues;
