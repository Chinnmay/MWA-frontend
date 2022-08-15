import React, { useEffect, useState } from 'react';
import FarmerDetails from '../../components/FarmerDetails/FarmerDetails';
import CurrentIssues from '../../components/FarmerDetails/CurrentIssues';
import PastIssues from '../../components/FarmerDetails/PastIssues';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { useParams, useLocation, Link } from "react-router-dom";
import colors from '../../config/colors';

const ViewFarmer = (props) => {
    const { mobileNumber } = useParams();
    const location = useLocation();

    return (
        <Container fluid style={{marginTop:'5rem', marginBottom: '1rem'}}>
            <Row>
                <Col md={7}>
                    <FarmerDetails mobileNumber={mobileNumber} />
                </Col>
                <Col md={5} className="text-center">
                    <Row style={{marginBottom: '1rem', marginTop: '0.3rem'}}>
                        <Col xs={{ span: 10, offset: 1}}>
                            <Link to={{ pathname: `/addIssue/${mobileNumber}`, state: {farmerID : location.state.farmerID}}} style={{textDecoration: 'none'}}>
                                <div style={{ backgroundColor: colors.green, color: colors.white, paddingTop: '0.9rem', paddingBottom: '0.9rem', borderRadius: 5}}>
                                    Add New Issue
                                </div>
                            </Link>
                        </Col>
                    </Row>
                    <Row style={{marginBottom: '1rem'}}>
                        <Col>
                            <CurrentIssues farmerID={location.state.farmerID} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <PastIssues farmerID={location.state.farmerID} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default ViewFarmer;
