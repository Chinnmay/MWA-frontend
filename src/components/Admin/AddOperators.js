import React, { useEffect, useState } from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { Row, Col, Card } from 'react-bootstrap';
import { TextField } from '../reusable/TextField';
import { useLocation, useParams, useHistory } from "react-router-dom";
import validationSchema from "./validationSchema";
import ModalAlert from "../reusable/ModalAlert";
import { styles } from './styles';
import addNewOperator from "./addNewOperator";

const initialValues = {
    fullName: null,
    emailID: null,
    mobileNumber: null,
    whatsappNumber: null,
    password: null,
}

const AddOperators = () => {
    const [showAddOperatorAlert, setShowAddOperatorAlert] = useState(false);

    const handleAddOperator = async(values) => {
        const addOperatorResponse = await addNewOperator(values);
        if(addOperatorResponse.status == 200){
            console.log("HII"); 
            window.location.reload();
        }
        else{
            console.log(addOperatorResponse);
            setShowAddOperatorAlert(true);
        }
        console.log(values);
    }

    return(
        <>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleAddOperator(values);
            }}
        >
            {(formikProps) => {
                const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue, isValid } = formikProps;
                return (
                <Card>
                    <Card.Header style={styles.displayCardHeader}>
                    <Row>
                        <Col className='text-center'>
                            SignUp - Add Operator
                        </Col>
                    </Row>
                    </Card.Header>
                    <Card.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <TextField label="Mobile Number" name="mobileNumber" type="text"/>
                            </Col>
                            <Col md={6}>
                                <TextField label="Whatsapp Number" name="whatsappNumber" type="text"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextField label="Full Name" name="fullName" type="text"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextField label="Email" name="emailID" type="email"/>
                            </Col>
                        </Row>                                                     
                        <Row>
                            <Col md={6}>
                                <TextField label="Password" name="password" type="password"/>
                            </Col>
                            <Col md={6}>
                                <TextField label="Confirm Password" name="confirmpassword" type="password"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                            <button  className="btn btn-success" type="button" onClick={()=>handleSubmit()}>Add</button>
                            </Col>
                        </Row>
                        
                    </Form>  
                    </Card.Body>  
                </Card>     
            )}}           
        </Formik>

        {showAddOperatorAlert &&
            <ModalAlert
                size="lg"
                variant="danger"
                message="Some Error Occurred, Please check mobile number and email."
                resetCallback={setShowAddOperatorAlert}
            />}
        </>
    )
}

export default AddOperators;
