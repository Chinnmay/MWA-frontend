
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Container, Button, Row, Col, Form, Card, Badge, ListGroup, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import colors from "../../config/colors";
import {styles} from "./styles";
import LoadingSpinner from "../../components/reusable/LoadingSpinner";
import getRecommendedIssues from "../../components/IssueDetails/getRecommendedIssues";

const RecommendedIssues = (props) => {
  const [fetching, setFetching] = useState(true);
  const [recommended, setRecommended] = useState([]);

  const loadRecommendedIssues = async () => {
    setFetching(true);
    const recommendedResponse = await getRecommendedIssues(props.issueDetails);
    if (recommendedResponse.status == 200) {
      setRecommended(recommendedResponse.data.issues);
      console.log(recommendedResponse);
    } else {
      console.log(recommendedResponse);
    }
    setFetching(false);
  };
  useEffect(() => {    
    loadRecommendedIssues();
  },[]);

  return (
    <Card>
    <Card.Header style={styles.displaySearchContainerCardHeader}>
        <h3 className="font-weight-bold-display">Similar Issues
        <Badge pill variant="light" style={styles.badgePill}>
        {recommended.length ? recommended.length : 0}
        </Badge></h3>
    </Card.Header>
    <Card.Body style={styles.searchCardBody}>
        {recommended.length == 0 ? 
        <Alert variant="danger" className="m-0" style={{ textAlign: "center" }}>
            <b>No Similar Issues Found</b>
        </Alert>
        : (
        recommended &&
        recommended.map((val) => (
            <Link to={`/viewIssue/${val.issueCode}`}
            style={{ textDecoration: "none", color: "black" }}>
            <Row className="justify-content-center" style={styles.searchRow}>
                <Col md={3} className="text-truncate">{val.issueCode}</Col>
                <Col md={6} className="text-truncate">{val.title}</Col>
                <Col md={3} xs={6}><div className="text-truncate" style={{...styles.status,
                  backgroundColor: 
                    val.status == "New" ? colors.newColor 
                  : val.status == "In Progress" ? colors.inprogressColor
                  : val.status == "SolutionProvided" ? colors.solvedColor
                  : val.status == "In Follow Up" ? colors.infollowColor
                  : val.status == "Done" ? colors.doneColor
                  : val.status == "On Hold" ? colors.onholdColor
                  : val.status == "Rejected" ? colors.rejectedColor
                  : colors.yellow  
                }}>{val.status}</div></Col>
            </Row>
            </Link>
        ))
        )}
    </Card.Body>
    </Card>
  );
}

export default RecommendedIssues;
