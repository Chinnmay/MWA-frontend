import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Container, Button, Row, Col, Form, Card, Badge, ListGroup, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import SearchIssueForm from "./SearchIssueForm";
import {styles} from './styles';
import getSearchIssues from "./getSearchIssues";
import colors from "../../config/colors";

export default function Farmer() {
    const [issues, setIssues] = useState([]);
    const [firstCall, setFirstCall] = useState(true);

    const submitSearch = async(values) => {
        Object.keys(values).map((k) => {
        if (!values[k]) delete values[k];
        });
        const searchIssueResponse = await getSearchIssues(values);
        if(searchIssueResponse.status == 200){
            setIssues(searchIssueResponse.data);
            setFirstCall(false);
        }
        else{
            console.log(searchIssueResponse);
        }
    }
        
  return (
    <>
        <SearchIssueForm submitSearch={submitSearch} />
        {!firstCall && (
          <Row className="mt-3">
            <Col>
              <Card style={styles.displaySearchContainerCard}>
                <Card.Header style={styles.displaySearchContainerCardHeader}>
                  Issues Search Results
                  <Badge pill variant="light" style={styles.badgePill}>
                    {issues.length ? issues.length : 0}
                  </Badge>
                </Card.Header>
                <Card.Body style={styles.searchBody}>
                  {(issues.length === 0 || issues.message === "No issues Found") && !firstCall ? (
                    <Alert variant="danger" className="m-0" style={{ textAlign: "center" }}>
                      <b>Issue Not Found</b>
                    </Alert>
                  ) : (
                    issues &&
                    issues.message !== "No issues Found" &&
                    issues.map((val) => (
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
            </Col>
          </Row>
        )}
    </>
  );
}
