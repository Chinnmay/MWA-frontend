import React, { useEffect, useState } from "react";
import {Formik, Form, Field} from 'formik';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { TextField } from '../reusable/TextField';
import { styles } from './styles';
import moment from 'moment';
import colors from "../../config/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown} from "@fortawesome/free-solid-svg-icons";

const FarmerDetails = (props) => {
    const [farmerDetails, setFarmerDetails] = useState(props?.farmerInfo);

    return(
        <>
        <Formik
            enableReinitialize={true}
            initialValues={farmerDetails}
        >
            {(formikProps) => {
                const { values } = formikProps;
                return (
                <Accordion>
                <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" style={styles.displayCardHeader}>
                    <Row style={{alignItems:"center"}}>
                        <Col>
                            <h4>Farmer Info Preview</h4>
                        </Col>
                        <Col className='d-flex justify-content-end' style={{color: colors.white}}><FontAwesomeIcon icon={faChevronDown} size="lg" /></Col>
                    </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    <Form>
                        <Row>
                            <Col md={4}>
                            <TextField label="Full Name" name="fullName" type="text" disabled={true}/>
                            </Col>
                            <Col md={4}>
                                <TextField label="Mobile Number" name="mobileNumber" type="text" disabled={true}/>
                            </Col>
                            <Col md={4}>
                                <TextField label="WhatsApp Number" name="whatsappNumber" type="text" disabled={true}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <TextField label="Town/Village" name="townVillage" type="text" disabled={true}/>
                            </Col>
                            <Col md={4}>
                                <TextField label="District" name="district" type="text" disabled={true}/>        
                            </Col>
                            <Col md={4}>
                                <TextField label="State" name="state" type="text" disabled={true}/>        
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <TextField label="Previously Cultivated Crops" name="previousCropsCultivated" type="text" disabled={true}/>
                            </Col>                                                      
                            <Col md={6}>
                                <TextField label="Currently Cultivated Crops" name="currentCropsCultivated" type="text" disabled={true}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <TextField label="Land Acreage" name="landAcreage" type="text" disabled={true}/>
                            </Col>
                            <Col md={4}>
                                <label style={{ display: 'block'}}>Soil Testing Status</label>
                                <Field style={{width:'100%', height: '40%', marginBottom: '2rem'}} as="select" label="Soil Testing Status" name="soilTestingStatus" disabled={true}>
                                    <option value="Not Done">Not Done</option>        
                                    <option value="Done">Done</option>
                                </Field>
                            </Col>
                            {values && values.soilTestingStatus=="Done"?<Col md={4}>
                                <TextField label="Last Soil Tested On (Year)" name="lastSoilTestOn" type="text" disabled={true}/>  
                            </Col>:null}
                        </Row>
                    </Form>  
                    </Card.Body>  
                    </Accordion.Collapse>
                </Card>
                </Accordion>     
            )}}           
        </Formik>
        </>
    )
}

export default FarmerDetails;
