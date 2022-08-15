import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Dropdown, Spinner } from "react-bootstrap";
import CountCard from "./CountCard";
import TopProbsByMaxIssue from "./TopProbsByMaxIssue";
import TopProbsByDistrictByMaxIssue from "./TopProbsByDistrictByMaxIssue";
import UserDoneIssueCount from "./UserDoneIssueCount";
import axios from "axios";
import LoadingSpinner from "../reusable/LoadingSpinner";

export default function StatisticsDashboard() {
  const styles = {
    bodyContainer: {
      maxHeight: "40rem",
      overflowY: "auto"
    },
    categorySelect: {
      backgroundColor: "transparent",
      border: "2px solid #2d543e",
      color: "black",
      width: "100%"
    },
    statsHeader: {
      backgroundColor: "#2d543e",
      color: "white",
      textAlign: "center"
    },
    editButton: {
      marginBottom: "0.3rem"
    },
    dropdownButton: { backgroundColor: "#2d543e", width: "100%" }
  };

  const [completedIssueCount, setCompletedIssueCount] = useState(0);
  const [inProgressIssueCount, setInProgressIssueCount] = useState(0);
  const [onHoldIssueCount, setOnHoldIssueCount] = useState(0);
  const [farmerCount, setFarmerCount] = useState(0);
  const [userDoneIssueCounts, setUserDoneIssueCounts] = useState({});
  const [topProbsByMaxIssue, setTopProbsByMaxIssue] = useState({});
  const [topProbsByDistrictByMaxIssue, setTopProbsByDistrictByMaxIssue] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/issueCount/Done`).then(
      (res) => {
        if (res.status === 200) {
          setCompletedIssueCount(res.data.count);
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
      }
    );

    axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/issueCount/In Progress`).then(
      (res) => {
        if (res.status === 200) {
          setInProgressIssueCount(res.data.count);
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
      }
    );

    axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/issueCount/On Hold`).then(
      (res) => {
        if (res.status === 200) {
          setOnHoldIssueCount(res.data.count);
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
      }
    );

    axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/topProbsByMaxIssue`).then(
      (res) => {
        if (res.status === 200) {
          setTopProbsByMaxIssue(res.data);
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
      }
    );

    axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/topProbsByDistrictWithMaxIssues`).then(
      (res) => {
        if (res.status === 200) {
          setTopProbsByDistrictByMaxIssue(res.data);
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
      }
    );
    axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/farmerCount`).then(
      (res) => {
        if (res.status === 200) {
          setFarmerCount(res.data.farmerCount);
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
      }
    );
    axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/userDoneIssueCount`).then(
      (res) => {
        if (res.status === 200) {
          setFetching(false);
          setUserDoneIssueCounts(res.data);
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  useEffect(() => {}, [fetching]);
  return (
    <>
      {fetching ? (
        <LoadingSpinner />
      ) : (
        <Card>
          <Card.Header style={styles.statsHeader}>
            <Container>
              <Row style={{ alignItems: "center" }}>
                <Col>
                  <h4>{`Key Statistics`}</h4>
                </Col>
              </Row>
            </Container>
          </Card.Header>
          <Card.Body style={styles.bodyContainer}>
            <Container>
              <Row>
                <Col md={4}>
                  <CountCard heading="Completed Issues" count={completedIssueCount} />
                </Col>
                <Col md={4}>
                  <CountCard heading="In Progress Issues" count={inProgressIssueCount} />
                </Col>
                <Col md={4}>
                  <CountCard heading="On Hold Issues" count={onHoldIssueCount} />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={{ span: 4, offset: 4 }}>
                  <CountCard heading="Total Farmers" count={farmerCount} />
                </Col>
              </Row>
              <UserDoneIssueCount data={userDoneIssueCounts} />
              <TopProbsByMaxIssue data={topProbsByMaxIssue} />
              <TopProbsByDistrictByMaxIssue data={topProbsByDistrictByMaxIssue} />
            </Container>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
