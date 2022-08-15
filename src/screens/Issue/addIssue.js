import React, { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import AddIssueComponent from '../../components/AddIssue/AddIssue'

const AddIssue = () => {    
    return (
        <Row className="justify-content-md-center" style={{marginTop:'5rem', marginBottom: '1rem'}}>
            <Col md={8}>
                <AddIssueComponent />
            </Col>
        </Row>
    )
}

export default AddIssue;
