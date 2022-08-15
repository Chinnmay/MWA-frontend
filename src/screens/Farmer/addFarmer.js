import React, { useEffect, useState } from 'react';
import AddFarmerComponent from '../../components/AddFarmer'
import {Row, Col} from 'react-bootstrap';

const AddFarmer = () => {    
    return (
        <Row className="justify-content-md-center" style={{marginTop:'0.1rem', marginBottom: '1rem'}}>
            <Col md={8}>
                <AddFarmerComponent/>
            </Col>
        </Row>
    )
}

export default AddFarmer;
