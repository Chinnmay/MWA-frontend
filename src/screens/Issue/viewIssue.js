import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import IssueDetails from "../../components/IssueDetails/IssueDetails";
import IssueComments from "../../components/IssueComments/IssueComments";
import IssueImages from "../../components/IssueImages/IssueImage";
import FarmerInfoPreview from "../../components/IssueDetails/FarmerInfoPreview";
import RecommendedIssues from "../../components/IssueDetails/RecommendedIssues";
import getIssueDetails from "../../components/IssueDetails/getIssueDetails";
import getRecommendedIssues from "../../components/IssueDetails/getRecommendedIssues";
import LoadingSpinner from "../../components/reusable/LoadingSpinner";
import { useParams } from "react-router-dom";

const ViewIssue = () => {
  const { issueCode } = useParams();
  const [issueDetails, setIssueDetails] = useState(null);
  const [reloadDetails, setReloadDetails] = useState(false);
  
  const [fetching, setFetching] = useState(true);

  const reloadData = () => {
    setReloadDetails(!reloadDetails);
  };

  const loadIssueDetails = async () => {
    setFetching(true);
    const issueDetailsResponse = await getIssueDetails(issueCode);
    if (issueDetailsResponse.status == 200) { 
      console.log('Issuesloaded');   
      console.log(issueDetailsResponse);  
      setIssueDetails(issueDetailsResponse.data.issue);
      
    } else {
      console.log(issueDetailsResponse);
    }
    setFetching(false);    
  };

  useEffect(() => {
    loadIssueDetails(); 
  }, [reloadDetails]);

  
  useEffect(() => {}, [fetching]);
  return fetching ? (
    <div style={{ marginTop: "5rem" }}>
      <LoadingSpinner />
    </div>
  ) : (
    <Container fluid style={{ marginTop: "5rem", marginBottom: "1rem" }}>
      <Row>
        <Col style={{ marginBottom: "1rem" }}>
          {issueDetails && <FarmerInfoPreview farmerInfo={issueDetails.farmerID} />}
        </Col>
      </Row>
      <Row>
        <Col md={7}>
          <Row>
            <Col>{issueDetails && <IssueDetails issueDetails={issueDetails} reloadData={reloadData} />}</Col>
          </Row>
          <Row>
            <Col>{issueDetails && <IssueImages issueDetails={issueDetails} reloadData={reloadData} />}</Col>
          </Row>
          <Row>
            <Col>{issueDetails && <IssueComments issueDetails={issueDetails} reloadData={reloadData} />}</Col>
          </Row>
        </Col>
        <Col md={5}>
          {/* <RecommendedIssues recommended={recommended} /> */}
          {issueDetails && <RecommendedIssues issueDetails={issueDetails} reloadData={reloadData} />}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewIssue;
